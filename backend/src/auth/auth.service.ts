/* eslint-disable no-useless-constructor, @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { UsersService } from '../users/users.service';
// import { SentryService } from '../sentry/sentry.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.find(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, response: any) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    response.cookie('access_token', token);
    response.send({ token });
  }

  async oAuthGithub(code: string, response: any) {
    const oAuthUrl = process.env.OAUTH_ACCESS_TOKEN_URL;
    const clientId = process.env.OAUTH_CLIENT_ID;
    const clientSecret = process.env.OAUTH_CLIENT_SECRET;
    const url = new URL(oAuthUrl);
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('client_secret', clientSecret);
    url.searchParams.set('code', code);
    const preparedUrl = url.toString();

    const { data } = await axios.get(preparedUrl);
    const parsedData = data.split('&').reduce((acc, str) => {
      const [key, value] = str.split('=');
      return { ...acc, [key]: value };
    }, {});

    const githubUserDataUrl = process.env.GITHUB_USER_URL;
    const { data: githubUserData } = await axios.get(githubUserDataUrl, {
      headers: { Authorization: `Bearer ${parsedData.access_token}` },
    });

    this.sentryService.debug(`github user email: ${githubUserData.email}`);

    let user = githubUserData.email
      ? await this.usersService.findByEmail(githubUserData.email)
      : null;

    if (!user) {
      const password = generate();
      const userDto = {
        login: githubUserData.login,
        email: githubUserData.email,
        password,
        confirmPassword: password,
      };
      user = await this.usersService.create(userDto);
    }

    this.sentryService.debug(`current user email: ${user.email}`);

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    response.cookie('access_token', token);
    return response.redirect('/profile');
  }
}
