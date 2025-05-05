import { QueryRunner } from 'typeorm';
import * as request from 'supertest';
import { setupBeforeAll, TestContext } from './test-utils';
import {
  appClose,
  rollbackTransaction,
  startTransaction,
  seedTestData,
} from './test-utils';

describe('AuthController (e2e)', () => {
  let context: TestContext;
  let queryRunner: QueryRunner;

  beforeAll(async () => {
    context = await setupBeforeAll();
  });
  beforeEach(async () => {
    queryRunner = await startTransaction(context.dataSource);
    await seedTestData(context.repositories, context.data);
  });

  afterEach(async () => {
    await rollbackTransaction(queryRunner);
  });

  afterAll(async () => {
    await appClose(context.app);
  });

  it('/signin', async () => {
    await request(context.app.getHttpServer())
      .post('/api/signin')
      .send({})
      .expect(401);
    const { body } = await request(context.app.getHttpServer())
      .post(`/api/signin`)
      .send(context.data.testData.users.signin)
      .expect(201);
    expect(body.token).toBeDefined();
  });

  it('/signin upperCase', async () => {
    const { body } = await request(context.app.getHttpServer())
      .post(`/api/signin`)
      .send(context.data.testData.users.signinUpperCase)
      .expect(201);
    expect(body.token).toBeDefined();
  });

  it('/signout', async () => {
    return request(context.app.getHttpServer())
      .post('/api/signout')
      .auth(context.token.user, { type: 'bearer' })
      .expect(201);
  });
});
