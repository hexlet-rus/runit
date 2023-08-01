import { createContext } from 'react';

export const AuthContext = createContext({});

export const ThemeContext = createContext({
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: (theme) => null,
});

export const SnippetsContext = createContext({});
