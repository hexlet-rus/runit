import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../src/users/users.module';
import { AuthModule } from '../src/auth/auth.module';
import { AppService } from '../src/app.service';
import { UsersService } from '../src/users/users.service';
import { CheckEmail } from '../src/users/validation/check-email';
import { AppModule } from '../src/app.module';
import { User } from '../src/entities/user.entity';
import { Snippet } from '../src/entities/snippet.entity';
import getDataSourceConfig from '../src/config/data-source.config';

describe('UsersController (e2e)', () => {
  let app: NestExpressApplication;
  let usersRepo: Repository<User>;
  let snippetsRepo: Repository<Snippet>;
  let testData: Record<string, any>;
  let users: Array<Record<string, unknown>>;
  let snippets: Array<Record<string, unknown>>;
  let moduleFixture: TestingModule;
  let usersData: User[];
  let snippetsData: Snippet[];
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        AppModule,
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot(getDataSourceConfig()),
        TypeOrmModule.forFeature([User, Snippet]),
      ],
      providers: [AppService, UsersService, CheckEmail],
    }).compile();

    jwtService = moduleFixture.get<JwtService>(JwtService);

    users = JSON.parse(fs.readFileSync('__fixtures__/users.json', 'utf-8'));
    snippets = JSON.parse(
      fs.readFileSync('__fixtures__/snippets.json', 'utf-8'),
    );
    testData = JSON.parse(
      fs.readFileSync('__fixtures__/testData.json', 'utf-8'),
    ).users;

    usersRepo = moduleFixture.get('UsersRepository');
    snippetsRepo = moduleFixture.get('SnippetsRepository');
    usersData = usersRepo.create(users);
    snippetsData = snippetsRepo.create(snippets);

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.use(cookieParser());
    await app.init();
  });

  beforeEach(async () => {
    await usersRepo.insert(usersData);
    await snippetsRepo.insert(snippetsData);
    token = jwtService.sign(testData.sign);
  });

  it('create empty user', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/users')
      .send(testData.empty)
      .expect(400);
    expect(body.errs.message).toEqual(testData.errs);
  });

  it('update empty user', async () => {
    const { body } = await request(app.getHttpServer())
      .put('/users/1')
      .auth(token, { type: 'bearer' })
      .send(testData.empty)
      .expect(400);
    expect(body.errs.message).toEqual(testData.errs);
  });

  it('create', async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/users`)
      .send(testData.create)
      .expect(201);
    expect(body.token).toBeDefined();

    const response = await request(app.getHttpServer())
      .post(`/users`)
      .send(testData.create)
      .expect(400);
    expect(response.body.errs.message).toMatchObject(testData.createErrsUnique);
  });

  it('read', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users/1')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(body).toMatchObject(testData.read);
  });

  it('update', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/3')
      .auth(token, { type: 'bearer' })
      .send(testData.updateIncorrect)
      .expect(400);
    expect(response.body.errs.message).toMatchObject(testData.updateErrsUnique);

    const { email, username } = testData.update;
    const { body } = await request(app.getHttpServer())
      .put('/users/1')
      .auth(token, { type: 'bearer' })
      .send(testData.update)
      .expect(200);
    expect(body).toMatchObject({ email, username });
  });

  it('delete', async () => {
    await request(app.getHttpServer())
      .delete('/users/1')
      .auth(token, { type: 'bearer' })
      .expect(200);
    const deletedUser = await usersRepo.findOneBy({ id: 1 });
    expect(deletedUser).toBeNull();
  });

  it('profile', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users/profile')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(body).toMatchObject(testData.profile);
  });

  it('get all users', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(body).toHaveLength(3);
  });

  afterEach(async () => {
    await snippetsRepo.clear();
    await usersRepo.clear();
  });

  afterAll(async () => {
    await app.close();
  });
});
