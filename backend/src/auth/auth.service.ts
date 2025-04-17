/* eslint-disable no-useless-constructor, @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectSentry() private readonly sentryService: SentryService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.find(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken(user: any): string {
    const payload = { email: user.email, sub: user.id, isAdmin: user.isAdmin };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async signin(user: any, response: any) {
    const token = this.generateJwtToken(user);
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

    const { data } = await axios.get(preparedUrl, {
      headers: { Accept: 'application/json' },
    });

    const githubUserDataUrl = process.env.GITHUB_USER_URL;

    const { data: githubUserData } = await axios.get(githubUserDataUrl, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    const fetchEmail = async () => {
      const { data: githubUserEmail } = await axios.get(
        `${githubUserDataUrl}/emails`,
        {
          headers: { Authorization: `Bearer ${data.access_token}` },
        },
      );
      const { email } = githubUserEmail[0];
      return email;
    };

    const userEmail = githubUserData.email ?? (await fetchEmail());

    this.sentryService.debug(`github user email: ${userEmail}`);

    const curUser = await this.usersService.findByEmail(
      userEmail.toLowerCase(),
    );
    let user = curUser ?? null;

    if (!user) {
      const password = generate();
      const userDto = {
        username: githubUserData.login,
        email: userEmail.toLowerCase(),
        password,
      };
      user = await this.usersService.create(userDto);
    }

    this.sentryService.debug(`current user email: ${user.email}`);

    const token = this.generateJwtToken(user);
    response.cookie('access_token', token);

    const frontendUrl = this.configService.get<string>('app.frontendUrl');

    return response.redirect(`${frontendUrl}/profile`);
  }
}
