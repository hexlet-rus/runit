import { useContext } from 'react';

import { AuthContext, SnippetsContext } from '../contexts';
import useLanguage from './useLanguage';
import useRunButton from './useRunButton';
import useSaveButton from './useSaveButton';

const useAuth = () => useContext(AuthContext);
const useSnippets = () => useContext(SnippetsContext);

export { useAuth, useLanguage, useRunButton, useSnippets, useSaveButton };
