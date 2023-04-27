/* eslint-disable class-methods-use-this */
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBody, ApiCookieAuth, ApiOkResponse, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SignUpUserDto } from '../users/dto/signUp-user.dto';

@Controller()
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: SignUpUserDto })
  @ApiOkResponse({ description: 'Successfully logged in!' })
  @ApiUnauthorizedResponse({ description: 'Invalid login data!' })
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ description: 'Successfully logged out!' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    response.send();
  }

  @Get('oauth')
  @ApiQuery({ name: 'code', description: 'Auth github code' })
  @ApiOkResponse({ description: 'Successfully logged with github!' })
  async oAuth(@Query('code') code, @Req() req, @Res() response: Response) {
    if (!code) {
      const url = new URL(process.env.OAUTH_AUTHORIZE_URL);
      url.searchParams.set('client_id', process.env.OAUTH_CLIENT_ID);

      return response.redirect(url.toString());
    }

    return this.authService.oAuthGithub(code, response);
  }
}
