import { AuthState } from './auth.types';

/**
 * Types for Redux state management
 */

// Misc State Types
export interface MiscState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: number;
  messages: number;
}

// Root State Type
export interface RootState {
  auth: AuthState;
  misc: MiscState;
}

// Redux Thunk Types
export interface ThunkError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}