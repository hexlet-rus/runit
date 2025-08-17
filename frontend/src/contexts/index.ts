import { createContext } from 'react';
import { Languages } from 'src/types/slices';

export const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  isLoggedIn: false,
});

export const SnippetsContext = createContext({
  saveSnippet: (_code: string, _snippetName: string, _template: Languages | string) => null,
  renameSnippet: () => null,
  updateSnippet: () => null,
  deleteSnippet: (_ids: Array<number>) => null,
  genEmbedFrame: (f: (_username: string, _slug: string) => null) => null,
  genViewSnippetLink: (_username: string, _slug: string) => null,
  getSnippetData: (_id: number) => null,
  getSnippetDataByViewParams: () => null,
  hasViewSnippetParams: () => null,
  genEmbedSnippetLink: (_ownerUsername: string, _slug: string) => null,
  getDefaultSnippetName: () => null,
});
