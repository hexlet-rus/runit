import { useContext } from 'react';

import { AuthContext, SnippetsContext } from '../contexts';
import useLanguage from './useLanguage.js';
import useRunButton from './useRunButton.js';

const useAuth = () => useContext(AuthContext);
const useSnippets = () => useContext(SnippetsContext);

export { useAuth, useLanguage, useRunButton, useSnippets };
