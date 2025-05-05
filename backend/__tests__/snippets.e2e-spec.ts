import { QueryRunner } from 'typeorm';
import * as request from 'supertest';
import { setupBeforeAll, TestContext } from './test-utils';
import {
  appClose,
  rollbackTransaction,
  startTransaction,
  seedTestData,
} from './test-utils';

describe('SnippetsController (e2e)', () => {
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

  it('create', async () => {
    const { body } = await request(context.app.getHttpServer())
      .post('/api/snippets')
      .auth(context.token.user, { type: 'bearer' })
      .send(context.data.testData.snippets.create)
      .expect(201);
    expect(body).toMatchObject(context.data.testData.snippets.create);
  });

  it('read', async () => {
    const { body } = await request(context.app.getHttpServer())
      .get('/api/snippets/1')
      .expect(200);
    expect(body).toMatchObject(context.data.testData.snippets.read);
  });

  it('update', async () => {
    const { body } = await request(context.app.getHttpServer())
      .put('/api/snippets/1')
      .auth(context.token.user, { type: 'bearer' })
      .send(context.data.testData.snippets.update)
      .expect(200);
    expect(body).toMatchObject(context.data.testData.snippets.update);
  });

  it('delete', async () => {
    await request(context.app.getHttpServer())
      .delete('/api/snippets/1')
      .auth(context.token.user, { type: 'bearer' })
      .expect(200);
    const deletedSnippet = await context.repositories.snippetsRepo.findOneBy({
      id: 1,
    });
    expect(deletedSnippet).toBeNull();
  });

  it('get all snippets', async () => {
    const { body } = await request(context.app.getHttpServer())
      .get('/api/snippets')
      .expect(200);
    expect(body).toHaveLength(5);
  });
});
