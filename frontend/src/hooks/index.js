import { useContext } from 'react';

import { AuthContext, SnippetsContext } from '../contexts/index.js';
import useDebounce from './useDebounce.js';
import useLanguage from './useLanguage.js';
import useRunButton from './useRunButton.js';
import useTheme from './useTheme.js';
import useWindowSize from './useWindowSize.js';

const useAuth = () => useContext(AuthContext);
const useSnippets = () => useContext(SnippetsContext);

export {
  useAuth,
  useDebounce,
  useLanguage,
  useRunButton,
  useSnippets,
  useTheme,
  useWindowSize,
};
