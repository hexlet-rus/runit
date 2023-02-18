import { jwtConstants } from '../constants';

export default () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return {
        secret: jwtConstants.secretDev,
        signOptions: { expiresIn: '10s' },
      };
    case 'production':
      return {
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60m' },
      };
    default:
      return {
        secret: jwtConstants.secretDev,
        signOptions: { expiresIn: '60m' },
      };
  }
};
