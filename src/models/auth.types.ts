import { Role } from '@constants/roles';

/**
 * User model with complete type information
 */
export interface User {
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  role: Role;
  // Optional fields from API response
  organizationId?: string;
  organizationName?: string;
  phone?: string | null;
  phoneVerified?: boolean;
  lastLogin?: string | null;
  passwordChangedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  organization?: {
    id: string;
    name: string;
    tier: string;
  };
}

/**
 * Authentication state interface
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Authentication component props
 */
export interface AuthInitProps {
  children: React.ReactNode;
}

// Form data types for authentication
export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface PhoneVerificationData {
  phone: string;
  otp?: string;
}

export interface PasswordResetData {
  email: string;
  token?: string;
  newPassword?: string;
}