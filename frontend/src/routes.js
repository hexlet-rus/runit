const apiPath = '/api';

export default {
  // post - create user: { name, email, password, confirmPassword }
  // get - get all users
  usersPath: () => [apiPath, 'users'].join('/'),

  // get user info that is logged in
  userProfilePath: () => [apiPath, 'users', 'profile'].join('/'),

  // get user info
  userInfoPath: (param) => [apiPath, 'users', `${param}`].join('/'),

  // put - update user info: { name, email, password }
  updateUserPath: (id) => [apiPath, 'users', `${id}`].join('/'),

  loginPath: () => [apiPath, 'login'].join('/'),

  // post
  logoutPath: () => [apiPath, 'logout'].join('/'),

  // delete user
  deleteUserPath: (id) => [apiPath, 'users', `:${id}`].join('/'),

  // get - shows all snippets
  snippetsPath: () => [apiPath, 'snippets'].join('/'),

  // post - create snippet: { name, code }
  createSnippetPath: () => [apiPath, 'snippets'].join('/'),

  // get snippet
  getSnippetPath: (id) => [apiPath, 'snippets', `${id}`].join('/'),

  getSnippetPathByParams: (username, slug) =>
    [apiPath, 'snippets', username, slug].join('/'),

  // put - update snippet info: { name, code }
  updateSnippetPath: (id) => [apiPath, 'snippets', `${id}`].join('/'),

  // delete snippet
  deleteSnippetPath: (id) => [apiPath, 'snippets', `${id}`].join('/'),

  // get random initial snippet name
  getDefaultSnippetName: () => [apiPath, 'snippets', 'name'].join('/'),

  // OAuth
  oAuthPath: () => [apiPath, 'oauth'].join('/'),

  homePagePath: () => '/editor',
  aboutPagePath: () => '/about',
  profilePagePath: (username = ':username') => `/u/${username}`,
  myProfilePagePath: () => '/profile',
  settingsPagePath: () => '/settings',
  signInPagePath: () => '/singin',
  signUpPagePath: () => '/signup',
  remindPassPagePath: () => '/remind_password',
  licenseAgreementPath: () => '/licenseAgreement',
  snippetPagePath: (username = ':username', slug = ':slug') =>
    `u/${username}/snippets/${slug}`,
  embedSnippetPagePath: (username = ':username', slug = ':slug') =>
    `/embed/u/${username}/snippets/${slug}`,
  landingPath: () => '/',
};
