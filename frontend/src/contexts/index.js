import { createContext } from 'react';

export const AuthContext = createContext({
  logIn: () => null,
  logOut: () => null,
  isLoggedIn: false,
});

export const SnippetsContext = createContext({
  saveSnippet: () => null,
  renameSnippet: () => null,
  updateSnippet: () => null,
  deleteSnippet: () => null,
  genEmbedFrame: () => null,
  genViewSnippetLink: () => null,
  getSnippetData: () => null,
  getSnippetDataByViewParams: () => null,
  hasViewSnippetParams: () => null,
  genEmbedSnippetLink: () => null,
  getDefaultSnippetName: () => null,
});
