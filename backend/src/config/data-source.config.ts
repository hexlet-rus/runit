import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Users } from '../entities/user.entity';
import { Snippets } from '../entities/snippet.entity';
import { migration1663236009774 } from '../migrations/1663236009774-migration';
import { migration1670352324202 } from '../migrations/1670352324202-migration';
import { AdduserRecoverHash1677580680097 } from '../migrations/1677580680097-AdduserRecoverHash';
import { FillNullSlugsSnippets1682678760453 } from '../migrations/1682678760453-fill-null-slugs-snippets';
import { RenameLoginToUsername1691073864288 } from '../migrations/1691073864288-RenameLoginToUsername';

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
        synchronize: false,
        ssl: { rejectUnauthorized: false },
        entities: [Users, Snippets],
        migrations: [
          migration1663236009774,
          migration1670352324202,
          AdduserRecoverHash1677580680097,
          FillNullSlugsSnippets1682678760453,
          RenameLoginToUsername1691073864288,
        ],
      };
    case 'test':
      return {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: [Users, Snippets],
        migrations: [
          migration1663236009774,
          migration1670352324202,
          AdduserRecoverHash1677580680097,
        ],
      };
    default:
      return {
        type: 'sqlite',
        database: 'runit.sqlite',
        synchronize: false,
        entities: [Users, Snippets],
        migrations: [
          migration1663236009774,
          migration1670352324202,
          AdduserRecoverHash1677580680097,
        ],
      };
  }
};
