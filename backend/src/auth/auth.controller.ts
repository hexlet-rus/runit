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
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SignUpUserDto } from '../users/dto/signUp-user.dto';

@ApiTags('auth')
@Controller('api')
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiBody({ type: SignUpUserDto })
  @ApiCreatedResponse({
    description: 'Successfully logged in! Token lasts 60 minutes!',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid signin data!' })
  async signin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.signin(req.user, response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  @ApiCookieAuth('access_token')
  @ApiCreatedResponse({ description: 'Successfully logged out!' })
  async signout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    response.send();
  }

  @Get('oauth')
  @ApiQuery({ name: 'code', description: 'Auth github code' })
  @ApiOkResponse({
    description: 'Successfully logged with github! Token lasts 60 minutes!',
  })
  async oAuth(@Query('code') code, @Req() req, @Res() response: Response) {
    const scope = 'user:email';

    if (!code) {
      const url = new URL(process.env.OAUTH_AUTHORIZE_URL);
      url.searchParams.set('client_id', process.env.OAUTH_CLIENT_ID);
      url.searchParams.set('scope', scope);

      return response.redirect(url.toString());
    }

    return this.authService.oAuthGithub(code, response);
  }
}
