import { useEffect } from 'react';
import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  changeTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set) => {
  const storedTheme = localStorage.getItem('theme') as Theme | null;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initialTheme = storedTheme || systemTheme;

  return {
    theme: initialTheme,
    changeTheme: () => set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    }),
  };
});

export const useTheme = () => {
  const { theme, changeTheme } = useThemeStore();

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return { theme, changeTheme };
};