export default () => {
  const settings = {
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: null,
  };
  if (process.env.NODE_ENV === 'production') {
    settings.tracesSampleRate = 1.0;
  }
  
  return settings;
};
