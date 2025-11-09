import { Role } from '@constants/roles';

// Types for login functionality
export interface LoginCredentials {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

// LoginResponse is now imported from @models/api-types.ts
// This ensures consistency across the application

export interface LoginError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}
