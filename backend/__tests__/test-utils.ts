import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'node:path';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../src/app.module';
import { User } from '../src/entities/user.entity';
import { Snippet } from '../src/entities/snippet.entity';
import getDataSourceConfig from '../src/config/data-source.config';
import { UserSettings } from '../src/entities/user-settings.entity';
import * as session from 'express-session';
import * as flash from 'connect-flash';

export type EntityRepositories = {
  usersRepo: Repository<User>;
  snippetsRepo: Repository<Snippet>;
  userSettingsRepo: Repository<UserSettings>;
};

export interface TestContext {
  moduleFixture: TestingModule;
  app: NestExpressApplication;
  repositories: EntityRepositories;
  token: { admin: string; user: string };
  dataSource: DataSource;
  data: any;
}

const getFilePath = (fileTest: string): string => {
  return join(`__fixtures__/${fileTest}`);
};

export const loadTestData = <T>(fileTest: string): T => {
  const filePath = getFilePath(fileTest);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

export const setupBeforeAll = async (): Promise<TestContext> => {
  const moduleFixture = await Test.createTestingModule({
    imports: [
      AppModule,
      TypeOrmModule.forRoot(getDataSourceConfig()),
      TypeOrmModule.forFeature([User, Snippet, UserSettings]),
    ],
  }).compile();

  const app = moduleFixture.createNestApplication<NestExpressApplication>();
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    }),
  );
  app.use(flash());
  app.setBaseViewsDir(join(__dirname, '..', 'src/admins/views'));
  await app.init();

  const usersRepo = moduleFixture.get(getRepositoryToken(User));
  const snippetsRepo = moduleFixture.get(getRepositoryToken(Snippet));
  const userSettingsRepo = moduleFixture.get(getRepositoryToken(UserSettings));
  const jwtService = moduleFixture.get<JwtService>(JwtService);
  const dataSource = moduleFixture.get(DataSource);

  const data = {
    users: loadTestData<Array<Record<string, unknown>>>('users.json'),
    snippets: loadTestData<Array<Record<string, unknown>>>('snippets.json'),
    userSettings: loadTestData<Array<Record<string, unknown>>>('settings.json'),
    testData: loadTestData<Record<string, any>>('testData.json'),
  };

  const token = {
    admin: await jwtService.sign(data.testData.users.sign),
    user: await jwtService.sign(data.testData.users.sign2),
  };

  return {
    moduleFixture,
    app,
    repositories: { usersRepo, snippetsRepo, userSettingsRepo },
    token,
    dataSource,
    data,
  };
};

export const startTransaction = async (
  dataSource: DataSource,
): Promise<QueryRunner> => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  return queryRunner;
};

export const seedTestData = async (
  repositories: EntityRepositories,
  data: {
    users: Array<Record<string, unknown>>;
    snippets: Array<Record<string, unknown>>;
    userSettings: Array<Record<string, unknown>>;
  },
) => {
  await repositories.usersRepo.save(repositories.usersRepo.create(data.users));
  await repositories.snippetsRepo.save(
    repositories.snippetsRepo.create(data.snippets),
  );
  await repositories.userSettingsRepo.save(
    repositories.userSettingsRepo.create(data.userSettings),
  );
};

export const rollbackTransaction = async (queryRunner: QueryRunner) => {
  await queryRunner.rollbackTransaction();
  await queryRunner.release();
};

export const appClose = async (app: NestExpressApplication) => {
  await app.close();
};
