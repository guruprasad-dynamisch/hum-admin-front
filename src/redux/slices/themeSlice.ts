import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { logger } from '@utils/logger';

export type Theme = 'light' | 'dark';

interface ThemeState {
  currentTheme: Theme;
}

const THEME_STORAGE_KEY = 'app-theme';

// Load theme from localStorage or default to dark
const getInitialTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (stored === 'light' || stored === 'dark') ? stored : 'dark';
  } catch {
    return 'dark';
  }
};

const initialState: ThemeState = {
  currentTheme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
      // Persist to localStorage
      try {
        localStorage.setItem(THEME_STORAGE_KEY, action.payload);
      } catch (error) {
        logger.error('Failed to save theme to localStorage', error);
      }
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    toggleTheme: (state) => {
      const newTheme: Theme = state.currentTheme === 'dark' ? 'light' : 'dark';
      state.currentTheme = newTheme;
      // Persist to localStorage
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch (error) {
        logger.error('Failed to save theme to localStorage', error);
      }
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', newTheme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.currentTheme;

export default themeSlice.reducer;
