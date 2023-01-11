/* eslint-disable class-methods-use-this */
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import getJwtExtractConfig from './config/jwt-extract.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(getJwtExtractConfig());
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
