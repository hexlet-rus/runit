import { createContext } from 'react';

export const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
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
