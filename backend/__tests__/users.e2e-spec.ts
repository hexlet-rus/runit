import { QueryRunner } from 'typeorm';
import * as request from 'supertest';
import { setupBeforeAll, TestContext } from './test-utils';
import {
  appClose,
  rollbackTransaction,
  startTransaction,
  seedTestData,
} from './test-utils';

describe('UsersController', () => {
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

  it('create empty user', async () => {
    const { body } = await request(context.app.getHttpServer())
      .post('/api/users')
      .send(context.data.testData.users.empty)
      .expect(400);
    expect(body.errs.message).toEqual(context.data.testData.users.errs);
  });

  it('update empty user', async () => {
    const { body } = await request(context.app.getHttpServer())
      .put('/api/users/1')
      .auth(context.token.user, { type: 'bearer' })
      .send(context.data.testData.users.empty)
      .expect(400);
    expect(body.errs.message).toEqual(context.data.testData.users.errs);
  });

  it('create', async () => {
    const { body } = await request(context.app.getHttpServer())
      .post(`/api/users`)
      .send(context.data.testData.users.create)
      .expect(201);
    expect(body.token).toBeDefined();

    const response = await request(context.app.getHttpServer())
      .post(`/api/users`)
      .send(context.data.testData.users.create)
      .expect(400);
    expect(response.body.errs.message).toMatchObject(
      context.data.testData.users.createErrsUnique,
    );
  });

  it('read', async () => {
    const { body } = await request(context.app.getHttpServer())
      .get('/api/users/1')
      .auth(context.token.user, { type: 'bearer' })
      .expect(200);
    expect(body).toMatchObject(context.data.testData.users.read);
  });

  it('update', async () => {
    const response = await request(context.app.getHttpServer())
      .put('/api/users/3')
      .auth(context.token.user, { type: 'bearer' })
      .send(context.data.testData.users.updateIncorrect)
      .expect(400);
    expect(response.body.errs.message).toMatchObject(
      context.data.testData.users.updateErrsUnique,
    );

    const { email, username } = context.data.testData.users.update;
    const { body } = await request(context.app.getHttpServer())
      .put('/api/users/1')
      .auth(context.token.user, { type: 'bearer' })
      .send(context.data.testData.users.update)
      .expect(200);
    expect(body).toMatchObject({ email: email.toLowerCase(), username });
  });

  it('delete', async () => {
    await request(context.app.getHttpServer())
      .delete('/api/users/1')
      .auth(context.token.user, { type: 'bearer' })
      .expect(200);
    const deletedUser = await context.repositories.usersRepo.findOneBy({
      id: 1,
    });
    expect(deletedUser).toBeNull();
  });

  it('profile', async () => {
    const { body } = await request(context.app.getHttpServer())
      .get('/api/users/profile')
      .auth(context.token.user, { type: 'bearer' })
      .expect(200);
    expect(body).toMatchObject(context.data.testData.users.profile);
  });

  it('get all users', async () => {
    const { body } = await request(context.app.getHttpServer())
      .get('/api/users')
      .auth(context.token.user, { type: 'bearer' })
      .expect(200);
    expect(body).toHaveLength(3);
  });
});
