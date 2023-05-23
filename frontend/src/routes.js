const apiPath = '/api';

export default {
  // post - create user: { name, email, password, confirmPassword }
  // get - get all users
  usersPath: () => [apiPath, 'users'].join('/'),
  userProfilePath: () => [apiPath, 'users', 'profile'].join('/'), // get user info that is logged in
  userInfoPath: (param) => [apiPath, 'users', `${param}`].join('/'), // get user info
  updateUserPath: (id) => [apiPath, 'users', `${id}`].join('/'), // put - update user info: { name, email, password }
  loginPath: () => [apiPath, 'login'].join('/'),
  logoutPath: () => [apiPath, 'logout'].join('/'), // post
  deleteUserPath: (id) => [apiPath, 'users', `:${id}`].join('/'), // delete user
  snippetsPath: () => [apiPath, 'snippets'].join('/'), // get - shows all snippets
  createSnippetPath: () => [apiPath, 'snippets'].join('/'), // post - create snippet: { name, code }
  getSnippetPath: (id) => [apiPath, 'snippets', `${id}`].join('/'), // get snippet
  getSnippetPathByLoginSlug: (login, slug) =>
    [apiPath, 'snippets', login, slug].join('/'),
  updateSnippetPath: (id) => [apiPath, 'snippets', `${id}`].join('/'), // put - update snippet info: { name, code }
  deleteSnippetPath: (id) => [apiPath, 'snippets', `${id}`].join('/'), // delete snippet
  getDefaultSnippetName: () => [apiPath, 'snippets', 'name'].join('/'), // get random initial snippet name
  homePagePath: () => '/editor',
  aboutPagePath: () => '/about',
  defaultProfilePagePath: () => '/profile/snippets',
  profileSettingsPagePath: () => '/profile/settings',
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  remindPassPagePath: () => '/remind_password',
  embedPagePath: () => '/embed',
  licenseAgreementPath: () => '/licenseAgreement',
  snippetPagePath: () => '/users/:login/snippets/:slug',
  embedSnippetPagePath: () => '/users/:login/embed/snippets/:slug',
  oAuthPath: () => [apiPath, 'oauth'].join('/'), // OAuth
};
