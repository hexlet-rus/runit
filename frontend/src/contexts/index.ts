import { createContext } from 'react';
import type {
  ICreateSnippetsContext,
  ICreateAuthContext,
} from 'src/types/context';

export const AuthContext = createContext<ICreateAuthContext>({
  signIn: () => null,
  signOut: () => null,
  isLoggedIn: false,
});

export const SnippetsContext = createContext<ICreateSnippetsContext>({
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
