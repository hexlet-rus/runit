/* global get */

test('/build', async () => {
  const response = await get('/snippets/build');
  expect(response).toMatchObject({ statusCode: 200 });
});
