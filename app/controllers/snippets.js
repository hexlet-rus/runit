import Snippet from '../entities/Snippet.js';

export const build = async (request, response) => {
  const languages = ['javascript', 'php', 'python'];
  response.render({ languages });
};

export const show = async (request, response, { db }) => {
  const editor = await db.connection
    .getRepository(Snippet)
    .findOne({ id: request.params.id });
  if (!editor) {
    response.head(404);
    return;
  }

  response.render({ gon: { language: editor.language } });
};

export const create = async (request, response, { router, db }) => {
  const snippet = new Snippet(request.body.snippet);
  if (snippet instanceof Object) {
    await db.connection.manager.save(snippet);
    response.redirectTo(router.routePath('snippet', snippet.id));
  }
};
