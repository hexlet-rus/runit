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

@Controller()
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    response.send();
  }

  @Get('oauth')
  async oAuth(@Query('code') code, @Req() req, @Res() response: Response) {
    if (!code) {
      const url = new URL(process.env.OAUTH_AUTHORIZE_URL);
      url.searchParams.set('client_id', process.env.OAUTH_CLIENT_ID);

      return response.redirect(url.toString());
    }

    return this.authService.oAuthGithub(code, response);
  }
}
