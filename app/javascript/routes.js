const apiPath = '/api';

export default {
  // post - create user: { name, email, password, confirmPassword }
  // get - get all users
  usersPath: () => [apiPath, 'users'].join('/'),
  userProfilePath: () => [apiPath, 'users', 'profile'].join('/'), // get user info that is logged in
  userInfoPath: (id) => [apiPath, 'users', `${id}`].join('/'), // get user info
  updateUserPath: (id) => [apiPath, 'users', `${id}`].join('/'), // put - update user info: { name, email, password }
  loginPath: () => [apiPath, 'login'].join('/'),
  logoutPath: () => [apiPath, 'logout'].join('/'), // post
  deleteUserPath: (id) => [apiPath, 'users', `:${id}`].join('/'), // delete user
  snippetsPath: () => [apiPath, 'snippets'].join('/'), // get - shows all snippets
  createSnippetPath: () => [apiPath, 'snippets'].join('/'), // post - create snippet: { code }
  getSnippetPath: (id) => [apiPath, 'snippets', `${id}`].join('/'), // get snippet
  updateSnippetPath: (id) => [apiPath, 'snippets', `${id}`].join('/'), // put - update snippet info: { name, code }
  deleteSnippetPath: (id) => [apiPath, 'snippets', `${id}`].join('/'), // delete snippet
  homePagePath: () => '/',
  aboutPagePath: () => '/about',
  profilePagePath: () => '/profile',
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  remindPassPagePath: () => '/remind_password',
  replsPagePath: () => '/repls',
};
