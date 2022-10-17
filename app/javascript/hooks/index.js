import { useContext } from 'react';

import { AuthContext } from '../contexts/index.js';

export const useAuth = () => useContext(AuthContext);
