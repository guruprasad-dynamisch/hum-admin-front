import { Role } from '@constants/roles';

// Types for login functionality
export interface LoginCredentials {
    identifier: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    username?: string; // Made optional to support email-based login
    email?: string;
    userType?: Role;
  };
}

// API response structure from backend
// Note: Both access and refresh tokens are sent via httpOnly cookies, not in response body
export interface LoginApiResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    isActive: boolean;
  };
}

export interface LoginError {
  message: string;
  code?: string;
}
