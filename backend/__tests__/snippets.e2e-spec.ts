import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../src/users/users.module';
import { AuthModule } from '../src/auth/auth.module';
import { AppModule } from '../src/app.module';
import { User } from '../src/entities/user.entity';
import { Snippet } from '../src/entities/snippet.entity';
import getDataSourceConfig from '../src/config/data-source.config';
import { UserSettings } from '../src/entities/user-settings.entity';

describe('SnippetsController (e2e)', () => {
  let app: NestExpressApplication;
  let usersRepo: Repository<User>;
  let snippetsRepo: Repository<Snippet>;
  let userSettingsRepo: Repository<UserSettings>;
  let testData: Record<string, any>;
  let users: Array<Record<string, unknown>>;
  let snippets: Array<Record<string, unknown>>;
  let userSettings: Array<Record<string, unknown>>;
  let jwtService: JwtService;
  let token: string;
  let dataSource: DataSource;

  const loadTestData = <T>(filePath: string): T =>
    JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(getDataSourceConfig()),
        TypeOrmModule.forFeature([User, Snippet, UserSettings]),
      ],
    }).compile();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    usersRepo = moduleFixture.get(getRepositoryToken(User));
    snippetsRepo = moduleFixture.get(getRepositoryToken(Snippet));
    userSettingsRepo = moduleFixture.get(getRepositoryToken(UserSettings));
    dataSource = moduleFixture.get(DataSource);

    users = loadTestData<Array<Record<string, unknown>>>(
      '__fixtures__/users.json',
    );
    snippets = loadTestData<Array<Record<string, unknown>>>(
      '__fixtures__/snippets.json',
    );
    userSettings = loadTestData<Array<Record<string, unknown>>>(
      '__fixtures__/settings.json',
    );
    testData = loadTestData<Record<string, any>>('__fixtures__/testData.json');

    // Инициализация приложения
    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  beforeEach(async () => {
    // Создаем QueryRunner для управления транзакциями
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Сохраняем QueryRunner в глобальном контексте для использования в тестах
    (global as any).queryRunner = queryRunner;

    // Вставка пользователей
    const testUsers = usersRepo.create(users);
    await usersRepo.save(testUsers);

    // Вставка сниппетов
    const testSnippets = snippetsRepo.create(snippets);
    await snippetsRepo.save(testSnippets);

    // Вставка настроек пользователей
    const testUserSettings = userSettingsRepo.create(userSettings);
    await userSettingsRepo.save(testUserSettings);

    // Генерация JWT-токена
    token = await jwtService.sign(testData.users.sign);
  });

  afterEach(async () => {
    // Откатываем транзакцию после каждого теста
    const queryRunner = (global as any).queryRunner;
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  });

  afterAll(async () => {
    // Закрытие приложения
    await app.close();
  });

  it('create', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/api/snippets')
      .auth(token, { type: 'bearer' })
      .send(testData.snippets.create)
      .expect(201);
    expect(body).toMatchObject(testData.snippets.create);
  });

  it('read', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/api/snippets/1')
      .expect(200);
    expect(body).toMatchObject(testData.snippets.read);
  });

  it('update', async () => {
    const { body } = await request(app.getHttpServer())
      .put('/api/snippets/1')
      .auth(token, { type: 'bearer' })
      .send(testData.snippets.update)
      .expect(200);
    expect(body).toMatchObject(testData.snippets.update);
  });

  it('delete', async () => {
    await request(app.getHttpServer())
      .delete('/api/snippets/1')
      .auth(token, { type: 'bearer' })
      .expect(200);
    const deletedSnippet = await snippetsRepo.findOneBy({ id: 1 });
    expect(deletedSnippet).toBeNull();
  });

  it('get all snippets', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/api/snippets')
      .expect(200);
    expect(body).toHaveLength(5);
  });
});
