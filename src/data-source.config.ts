import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Users } from './entities/user.entity';
import { Snippets } from './entities/snippet.entity';
import { migration1663236009774 } from './migrations/1663236009774-migration';

export default (): DataSourceOptions => {
  config();

  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        type: 'postgres',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT),
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        entities: [`${__dirname}/entities/*.entity.{ts,js}`],
        migrations: [migration1663236009774],
      };
    default:
      return {
        type: 'sqlite',
        database: 'runit.sqlite',
        entities: [Users, Snippets],
        migrations: [migration1663236009774],
      };
  }
};
