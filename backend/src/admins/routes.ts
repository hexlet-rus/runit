const adminPath = '/admin';

const getPathWithQuery = (basePathSegment, page = 1, additionalParams = {}) => {
  const basePath = [adminPath, basePathSegment].join('/');
  const queryParams = { page, ...additionalParams };

  const searchParams = new URLSearchParams();
  /* eslint-disable no-restricted-syntax */
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }
  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

export default {
  // Get
  getUsersPath: (page = 1, additionalParams = {}) => {
    return getPathWithQuery('users', page, additionalParams);
  },

  getSnippetsPath: (page = 1, additionalParams = {}) => {
    return getPathWithQuery('snippets', page, additionalParams);
  },

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
