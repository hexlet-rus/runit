import { useContext } from 'react';

import { AuthContext, ThemeContext, SnippetsContext } from '../contexts';
import useDebounce from './useDebounce.js';
import useLanguage from './useLanguage.js';
import useRunButton from './useRunButton.js';
import useWindowSize from './useWindowSize.js';

const useAuth = () => useContext(AuthContext);
const useSnippets = () => useContext(SnippetsContext);
const useTheme = () => useContext(ThemeContext);

export {
  useAuth,
  useDebounce,
  useLanguage,
  useRunButton,
  useSnippets,
  useTheme,
  useWindowSize,
};
