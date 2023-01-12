import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { cookieExtractor } from '../extractor/cookie.extractor';

export default () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secretTest,
      };
    default:
      return {
        jwtFromRequest: cookieExtractor,
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret,
      };
  }
};
