import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as fs from 'fs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Repository } from 'typeorm';
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
  let moduleFixture: TestingModule;
  let usersData: User[];
  let jwtService: JwtService;

  // FIXME: все тесты проходят если beforeEach
  // заново полный setup -> надо перенести в хуки сброс аппа между тестами
  // beforeEach(async () => {
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        AppModule,
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot(getDataSourceConfig()),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    jwtService = moduleFixture.get<JwtService>(JwtService);

    users = JSON.parse(fs.readFileSync('__fixtures__/users.json', 'utf-8'));
    testData = JSON.parse(
      fs.readFileSync('__fixtures__/testData.json', 'utf-8'),
    ).users;

    usersRepo = moduleFixture.get('UsersRepository');
    usersData = usersRepo.create(users);

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  beforeEach(async () => {
    await usersRepo.insert(usersData);
  });

  it('/signin', async () => {
    await request(app.getHttpServer()).post('/signin').send({}).expect(401);
    const { body } = await request(app.getHttpServer())
      .post(`/signin`)
      .send(testData.signin)
      .expect(201);
    expect(body.token).toBeDefined();
  });

  it('/signin upperCase', async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/signin`)
      .send(testData.signinUpperCase)
      .expect(201);
    expect(body.token).toBeDefined();
  });

  it('/signout', async () => {
    const token = jwtService.sign(testData.sign);
    return request(app.getHttpServer())
      .post('/signout')
      .auth(token, { type: 'bearer' })
      .expect(201);
  });

  afterEach(async () => {
    await usersRepo.clear();
  });

  afterAll(async () => {
    await app.close();
  });
});
