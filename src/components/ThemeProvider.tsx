import { useEffect } from 'react';
import { useAppSelector } from '@redux/store';
import { selectTheme } from '@redux/slices/themeSlice';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider - Applies theme to document on mount and when theme changes
 * Ensures theme attribute is set on document root for CSS variable switching
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
