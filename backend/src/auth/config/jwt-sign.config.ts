import { jwtConstants } from '../constants';

export default () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return {
        secret: jwtConstants.secretTest,
        signOptions: { expiresIn: '10s' },
      };
    default:
      return {
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60m' },
      };
  }
};
