import { LogLevel } from '@nestjs/common';

export default () => {
  const settings = {
    dsn: process.env.SENTRY_DSN,
    debug: true,
    environment: process.env.NODE_ENV || 'dev',
    logLevels: [<LogLevel>'debug'], // based on sentry.io loglevel //
  };
  // if (process.env.NODE_ENV === 'production') {
  //   settings.tracesSampleRate = 1.0;
  // }

  return settings;
};
