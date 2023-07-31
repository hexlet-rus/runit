import { useLayoutEffect, useState } from 'react';

const themeAttribute = 'data-bs-theme';

const getSystemTheme = () => {
  const isDarkTheme = window?.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  return isDarkTheme ? 'dark' : 'light';
};

const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || getSystemTheme(),
  );

  // const getResolvedTheme = useCallback(() => {
  //   if (theme === 'system') {
  //     return getSystemTheme();
  //   }
  //   return theme;
  // }, [theme]);

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

  useLayoutEffect(() => {
    document.documentElement.setAttribute(themeAttribute, resolvedTheme);
    localStorage.setItem('theme', theme);
  }, [theme, resolvedTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
  };
};

export default useTheme;
