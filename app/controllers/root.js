export default async (request, response, { router }) => {
  response.redirectTo(router.routePath('snippet', 'build'));
};
