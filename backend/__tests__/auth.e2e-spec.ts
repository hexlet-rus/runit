import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as fs from 'fs';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DataSource, Repository } from 'typeorm';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { JwtService } from '@nestjs/jwt';
import { User } from '../src/entities/user.entity';
import { AuthModule } from '../src/auth/auth.module';
import getDataSourceConfig from '../src/config/data-source.config';
import { AppModule } from '../src/app.module';
import { UsersModule } from '../src/users/users.module';

describe('AuthController (e2e)', () => {
  let app: NestExpressApplication;
  let usersRepo: Repository<User>;
  let testData: Record<string, any>;
  let users: Array<Record<string, unknown>>;
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
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    usersRepo = moduleFixture.get(getRepositoryToken(User));
    dataSource = moduleFixture.get(DataSource);

    users = loadTestData<Array<Record<string, unknown>>>(
      '__fixtures__/users.json',
    );
    testData = loadTestData<Record<string, any>>(
      '__fixtures__/testData.json',
    ).users;

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

  it('/signin', async () => {
    await request(app.getHttpServer()).post('/api/signin').send({}).expect(401);
    const { body } = await request(app.getHttpServer())
      .post(`/api/signin`)
      .send(testData.signin)
      .expect(201);
    expect(body.token).toBeDefined();
  });

  it('/signin upperCase', async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/api/signin`)
      .send(testData.signinUpperCase)
      .expect(201);
    expect(body.token).toBeDefined();
  });

  it('/signout', async () => {
    return request(app.getHttpServer())
      .post('/api/signout')
      .auth(token, { type: 'bearer' })
      .expect(201);
  });
});
