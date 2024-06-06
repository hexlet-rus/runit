import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../src/users/users.module';
import { AuthModule } from '../src/auth/auth.module';
import { AppService } from '../src/app.service';
import { UsersService } from '../src/users/users.service';
import { AppModule } from '../src/app.module';
import { User } from '../src/entities/user.entity';
import { Snippet } from '../src/entities/snippet.entity';
import getDataSourceConfig from '../src/config/data-source.config';

describe('SnippetsController (e2e)', () => {
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
      providers: [AppService, UsersService],
    }).compile();

    jwtService = moduleFixture.get<JwtService>(JwtService);

    users = JSON.parse(fs.readFileSync('__fixtures__/users.json', 'utf-8'));
    snippets = JSON.parse(
      fs.readFileSync('__fixtures__/snippets.json', 'utf-8'),
    );
    testData = JSON.parse(
      fs.readFileSync('__fixtures__/testData.json', 'utf-8'),
    );

    usersRepo = moduleFixture.get('UsersRepository');
    snippetsRepo = moduleFixture.get('SnippetsRepository');
    usersData = usersRepo.create(users);
    snippetsData = snippetsRepo.create(snippets);

    await usersRepo.insert(usersData);

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  beforeEach(async () => {
    await snippetsRepo.insert(snippetsData);
    token = jwtService.sign(testData.users.sign);
  });

  it('create', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/snippets')
      .auth(token, { type: 'bearer' })
      .send(testData.snippets.create)
      .expect(201);
    expect(body).toMatchObject(testData.snippets.create);
  });

  it('read', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/snippets/1')
      .expect(200);
    expect(body).toMatchObject(testData.snippets.read);
  });

  it('update', async () => {
    const { body } = await request(app.getHttpServer())
      .put('/snippets/1')
      .auth(token, { type: 'bearer' })
      .send(testData.snippets.update)
      .expect(200);
    expect(body).toMatchObject(testData.snippets.update);
  });

  it('delete', async () => {
    await request(app.getHttpServer())
      .delete('/snippets/1')
      .auth(token, { type: 'bearer' })
      .expect(200);
    const deletedSnippet = await snippetsRepo.findOneBy({ id: 1 });
    expect(deletedSnippet).toBeNull();
  });

  it('get all snippets', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/snippets')
      .expect(200);
    expect(body).toHaveLength(5);
  });

  afterEach(async () => {
    await snippetsRepo.clear();
  });

  afterAll(async () => {
    await usersRepo.clear();
    await app.close();
  });
});
