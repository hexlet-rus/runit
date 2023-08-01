import { useLayoutEffect, useMemo, useState } from 'react';

import { ThemeContext } from '../contexts/index.js';

const themeAttribute = 'data-bs-theme';

const getSystemTheme = () => {
  const isDarkTheme = window?.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  return isDarkTheme ? 'dark' : 'light';
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || getSystemTheme(),
  );

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

  useLayoutEffect(() => {
    document.documentElement.setAttribute(themeAttribute, resolvedTheme);
    localStorage.setItem('theme', theme);
  }, [theme, resolvedTheme]);

  const memoizedValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
