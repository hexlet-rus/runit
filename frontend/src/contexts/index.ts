import { createContext } from 'react';
import { Languages } from 'src/types/slices';

export const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  isLoggedIn: false,
});

export const SnippetsContext = createContext({
  saveSnippet: (_code: string, _snippetName: string, _template: Languages | string) => null,
  renameSnippet: (_id: number, _data: { code: string, name: string}) => null,
  updateSnippet: (_id: string, _params: { code: string, name: string }) => null,
  deleteSnippet: (_ids: Array<number> | number) => null,
  genEmbedFrame: (_f: (_username: string, _slug: string) => null) => null,
  genViewSnippetLink: (_username: string, _slug: string) => null,
  getSnippetData: (_id: number) => null,
  getSnippetDataByViewParams: (_params: { username: string, slug: string}) => null,
  hasViewSnippetParams: (_data: { username: string, slug: string }) => null,
  genEmbedSnippetLink: (_ownerUsername: string, _slug: string) => null,
  getDefaultSnippetName: () => null,
});
