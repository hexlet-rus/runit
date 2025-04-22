import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'node:path';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

describe('UsersController and SnippetsController (e2e)', () => {
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
    // Создание тестового модуля
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(getDataSourceConfig()),
        TypeOrmModule.forFeature([User, Snippet, UserSettings]),
      ],
    }).compile();

    // Получение зависимостей
    jwtService = moduleFixture.get<JwtService>(JwtService);
    usersRepo = moduleFixture.get(getRepositoryToken(User));
    snippetsRepo = moduleFixture.get(getRepositoryToken(Snippet));
    userSettingsRepo = moduleFixture.get(getRepositoryToken(UserSettings));
    dataSource = moduleFixture.get(DataSource);

    // Загрузка тестовых данных
    users = loadTestData<Array<Record<string, unknown>>>(
      '__fixtures__/users.json',
    );
    snippets = loadTestData<Array<Record<string, unknown>>>(
      '__fixtures__/snippets.json',
    );
    userSettings = loadTestData<Array<Record<string, unknown>>>(
      '__fixtures__/settings.json',
    );
    testData = loadTestData<Record<string, any>>(
      '__fixtures__/testData.json',
    ).users;

    // Инициализация приложения
    app = moduleFixture.createNestApplication<NestExpressApplication>();
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
    token = await jwtService.sign(testData.sign);
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

  it('Delete user (Authorized admin)', async () => {
    await request(app.getHttpServer())
      .delete('/admin/users/1')
      .auth(token, { type: 'bearer' })
      .expect(302)
      .expect('Location', '/admin/users');
    const deletedUser = await usersRepo.findOneBy({ id: 1 });
    expect(deletedUser).toBeNull();
  });

  it('Delete user snippet (Authorized admin)', async () => {
    await request(app.getHttpServer())
      .delete('/admin/users/1/snippets/1')
      .auth(token, { type: 'bearer' })
      .expect(302)
      .expect('Location', '/admin/users/1/snippets');
    const deletedSnippet = await snippetsRepo.findOneBy({ id: 1 });
    expect(deletedSnippet).toBeNull();
  });

  it('Delete snippet (Authorized admin)', async () => {
    await request(app.getHttpServer())
      .delete('/admin/snippets/2')
      .auth(token, { type: 'bearer' })
      .expect(302)
      .expect('Location', '/admin/snippets');
    const deletedSnippet = await snippetsRepo.findOneBy({ id: 2 });
    expect(deletedSnippet).toBeNull();
  });

  it('Get all users (Authorized admin)', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/users')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(response.text).toContain(
      '<h1 class="text-center font-weight-bold pb-3">Пользователи</h1>',
    );
  });

  it('Get one user (Authorized admin)', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/users/1')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(response.text).toContain(
      '<h1 class="text-center font-weight-bold pb-3">Профиль пользователя</h1>',
    );
    expect(response.text).toContain(
      `<input class="form-control" id="username" name="username" type="text" value="${users[0].username}"/>`,
    );
    expect(response.text).toContain(
      `<input class="form-control" id="email" name="email" type="email" value="${users[0].email}"/>`,
    );
    expect(response.text).toContain(
      '<button class="btn btn-primary" type="submit">Сохранить</button>',
    );
  });

  it('Get one user (Authorized user)', async () => {
    const token2 = await jwtService.sign(testData.sign2);
    const response = await request(app.getHttpServer())
      .get('/admin/users/1')
      .auth(token2, { type: 'bearer' })
      .expect(403);
    expect(response.text).toContain('<p class="lead">Forbidden resource</p>');
  });

  it('Get one user (Unauthorized)', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/users/1')
      .expect(401);
    expect(response.text).toContain('<p class="lead">Unauthorized</p>');
  });

  it('update user (exists username)-(Authorized admin)', async () => {
    const response = await request(app.getHttpServer())
      .put('/admin/users/3')
      .auth(token, { type: 'bearer' })
      .send(testData.updateIncorrect)
      .expect(422);
    expect(response.text).toContain(
      '<div class="alert alert-warning" role="alert">Это имя уже занято</div>',
    );
  });

  it('update user (empty data)-(Authorized admin)', async () => {
    const response = await request(app.getHttpServer())
      .put('/admin/users/3')
      .auth(token, { type: 'bearer' })
      .send(testData.empty)
      .expect(422);
    expect(response.text).toContain(
      '<div class="alert alert-warning" role="alert">От 3 до 20 символов</div>',
    );
    expect(response.text).toContain(
      '<div class="alert alert-warning" role="alert">Некорректная электронная почта</div>',
    );
  });

  it('update user-(Authorized admin)', async () => {
    const { username, email } = testData.update;
    const response = await request(app.getHttpServer())
      .put('/admin/users/3')
      .auth(token, { type: 'bearer' })
      .send(`username=${username}`)
      .send(`email=${email}`)
      .send('isAdmin=false')
      .expect(302)
      .expect('Location', '/admin/users');
    const updatedUser = await usersRepo.findOneBy({ id: 3 });
    expect(updatedUser).toMatchObject({ username, email });
  });

  it('Get all snippets user (Authorized admin)', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/users/1/snippets')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(response.text).toContain(
      '<h1 class="text-center font-weight-bold pb-3">Сниппеты</h1>',
    );
  });

  it('Get all snippets (Authorized admin)', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/snippets')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(response.text).toContain(
      '<h1 class="text-center font-weight-bold pb-3">Сниппеты</h1>',
    );
  });
});
