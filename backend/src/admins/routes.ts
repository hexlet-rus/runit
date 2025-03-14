const adminPath = '/admin';

export default {
  // Get
  getUsersPath: (page = 1) => [adminPath, `users?page=${page}`].join('/'),

  getSnippetsPath: (page = 1) => [adminPath, `snippets?page=${page}`].join('/'),

  getUserSnippetsPath: (userId) =>
    [adminPath, 'users', `${userId}`, 'snippets'].join('/'),

  getFormUserEditPath: (userId) => [adminPath, 'users', `${userId}`].join('/'),

  getSnippetLink: (frontendUrl, username, slug) =>
    [`${frontendUrl}`, 'u', `${username}`, 'snippets', `${slug}`].join('/'),

  // Delete
  deleteUserPath: (userId) => [adminPath, 'users', `${userId}`].join('/'),

  deleteSnippetsPath: (snippetId) =>
    [adminPath, 'snippets', `${snippetId}`].join('/'),

  deleteUserSnippetPath: (userId, snippetId) =>
    [adminPath, 'users', `${userId}`, 'snippets', `${snippetId}`].join('/'),

  // Put { username, email, isAdmin }
  updateUserPath: (userId) => [adminPath, 'users', `${userId}`].join('/'),
};
