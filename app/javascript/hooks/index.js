import { useContext } from 'react';

import { AuthContext } from '../contexts/index.js';
import { SnippetsContext } from '../contexts/index.js';

export const useAuth = () => useContext(AuthContext);
export const useSnippets = () => useContext(SnippetsContext);

