import { useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light' | 'system';

const STORAGE_KEY = 'chain-map-theme';

function getSystemTheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getResolvedTheme(theme: Theme): 'dark' | 'light' {
  if (theme === 'system') return getSystemTheme();
  return theme;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as Theme) || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>(
    getResolvedTheme(theme)
  );

  useEffect(() => {
    const resolved = getResolvedTheme(theme);
    setResolvedTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        const resolved = getSystemTheme();
        setResolvedTheme(resolved);
        document.documentElement.setAttribute('data-theme', resolved);
        document.documentElement.classList.toggle('dark', resolved === 'dark');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const resolved = getResolvedTheme(prev);
      return resolved === 'dark' ? 'light' : 'dark';
    });
  }, []);

  return { theme, resolvedTheme, setTheme, toggleTheme };
}
