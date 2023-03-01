import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { cookieExtractor } from '../extractor/cookie.extractor';

export default () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        jwtFromRequest: cookieExtractor,
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret,
      };
    case 'test':
      return {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secretDev,
      };
    default:
      return {
        jwtFromRequest: cookieExtractor,
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secretDev,
      };
  }
};
