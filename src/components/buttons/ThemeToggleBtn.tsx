import React from 'react';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { toggleTheme, selectTheme } from '@redux/slices/themeSlice';
import IconBtn from './IconBtn';

interface ThemeToggleBtnProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * ThemeToggleBtn - Button to toggle between light and dark themes
 * 
 * Usage:
 * ```tsx
 * <ThemeToggleBtn />
 * <ThemeToggleBtn size="lg" />
 * ```
 */
const ThemeToggleBtn: React.FC<ThemeToggleBtnProps> = ({ size = 'md', className }) => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const icon = currentTheme === 'dark' ? '☀️' : '🌙';
  const label = currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <IconBtn
      size={size}
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className={className}
    >
      {icon}
    </IconBtn>
  );
};

export default ThemeToggleBtn;
