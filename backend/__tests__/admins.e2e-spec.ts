import { QueryRunner } from 'typeorm';
import * as request from 'supertest';
import { setupBeforeAll, TestContext } from './test-utils';
import {
  appClose,
  rollbackTransaction,
  startTransaction,
  seedTestData,
} from './test-utils';
import routes from '../src/admins/routes';

describe('UsersController and SnippetsController (e2e)', () => {
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

  it('Get all users', async () => {
    await request(context.app.getHttpServer())
      .get(routes.getUsersPath())
      .auth(context.token.admin, { type: 'bearer' })
      .expect(200);

    await request(context.app.getHttpServer())
      .get(routes.getUsersPath())
      .auth(context.token.user, { type: 'bearer' })
      .expect(403);

    await request(context.app.getHttpServer())
      .get(routes.getUsersPath())
      .expect(401);
  });

  it('Update user', async () => {
    const { username, email } = context.data.testData.users.update;

    await request(context.app.getHttpServer())
      .put(routes.updateUserPath(3))
      .auth(context.token.admin, { type: 'bearer' })
      .send(context.data.testData.users.updateIncorrect)
      .expect(422);

    await request(context.app.getHttpServer())
      .put(routes.updateUserPath(3))
      .auth(context.token.admin, { type: 'bearer' })
      .send(context.data.testData.users.empty)
      .expect(422);

    await request(context.app.getHttpServer())
      .put(routes.updateUserPath(3))
      .auth(context.token.admin, { type: 'bearer' })
      .send(`username=${username}`)
      .send(`email=${email}`)
      .send('isAdmin=false')
      .expect(302);
    const updatedUser = await context.repositories.usersRepo.findOneBy({
      id: 3,
    });
    expect(updatedUser).toMatchObject({
      username,
      email: email.toLowerCase(),
    });

    await request(context.app.getHttpServer())
      .put(routes.updateUserPath(3))
      .auth(context.token.user, { type: 'bearer' })
      .send(context.data.testData.users.updateIncorrect)
      .expect(403);

    await request(context.app.getHttpServer())
      .put(routes.updateUserPath(3))
      .send(context.data.testData.users.updateIncorrect)
      .expect(401);
  });

  it('Get one user', async () => {
    await request(context.app.getHttpServer())
      .get(routes.getFormUserEditPath(1))
      .auth(context.token.admin, { type: 'bearer' })
      .expect(200);

    await request(context.app.getHttpServer())
      .get(routes.getFormUserEditPath(1))
      .auth(context.token.user, { type: 'bearer' })
      .expect(403);

    await request(context.app.getHttpServer())
      .get(routes.getFormUserEditPath(1))
      .expect(401);
  });

  it('Get all snippets user', async () => {
    await request(context.app.getHttpServer())
      .get(routes.getUserSnippetsPath(1))
      .auth(context.token.admin, { type: 'bearer' })
      .expect(200);

    await request(context.app.getHttpServer())
      .get(routes.getUserSnippetsPath(1))
      .auth(context.token.user, { type: 'bearer' })
      .expect(403);

    await request(context.app.getHttpServer())
      .get(routes.getUserSnippetsPath(1))
      .expect(401);
  });

  it('Get all snippets', async () => {
    await request(context.app.getHttpServer())
      .get(routes.getSnippetsPath())
      .auth(context.token.admin, { type: 'bearer' })
      .expect(200);

    await request(context.app.getHttpServer())
      .get(routes.getSnippetsPath())
      .auth(context.token.user, { type: 'bearer' })
      .expect(403);

    await request(context.app.getHttpServer())
      .get(routes.getSnippetsPath())
      .expect(401);
  });

  it('Delete user', async () => {
    await request(context.app.getHttpServer())
      .delete(routes.deleteUserPath(1))
      .auth(context.token.admin, { type: 'bearer' })
      .expect(302);
    const deletedUser = await context.repositories.usersRepo.findOneBy({
      id: 1,
    });
    expect(deletedUser).toBeNull();

    await request(context.app.getHttpServer())
      .delete(routes.deleteUserPath(1))
      .auth(context.token.user, { type: 'bearer' })
      .expect(403);

    await request(context.app.getHttpServer())
      .delete(routes.deleteUserPath(1))
      .expect(401);
  });

  it('Delete snippet', async () => {
    await request(context.app.getHttpServer())
      .delete(routes.deleteSnippetsPath(2))
      .auth(context.token.admin, { type: 'bearer' })
      .expect(302);
    const deletedSnippet = await context.repositories.snippetsRepo.findOneBy({
      id: 2,
    });
    expect(deletedSnippet).toBeNull();

    await request(context.app.getHttpServer())
      .delete(routes.deleteSnippetsPath(2))
      .auth(context.token.user, { type: 'bearer' })
      .expect(403);

    await request(context.app.getHttpServer())
      .delete(routes.deleteSnippetsPath(2))
      .expect(401);
  });
});
