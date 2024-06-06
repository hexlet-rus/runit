import { DataSourceOptions } from 'typeorm';
export default (): DataSourceOptions => {
  const defaultConfig = {
    entities: [ __dirname + `/../entities/**/*{.ts,.js}`],
    migrations: [ __dirname + `/../migrations/**/*{.ts,.js}`],

  };
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        ...defaultConfig,
        type: 'postgres',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT),
        url: process.env.DATABASE_URL,
        synchronize: false,
        ssl: { rejectUnauthorized: false },
      };
    case 'test':
      return {
        ...defaultConfig,
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,

      };
    default:
      return {
        ...defaultConfig,
        type: 'sqlite',
        database: 'runit.sqlite',
        synchronize: false,
      };
  }
};
