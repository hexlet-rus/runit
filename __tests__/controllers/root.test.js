/* global get */

test('/', async () => {
  const response = await get('/');
  expect(response).toMatchObject({ statusCode: 302 });
});
