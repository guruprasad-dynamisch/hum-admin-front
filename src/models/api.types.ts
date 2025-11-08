import { User } from './auth.types';
import { Organization, OrganizationCreateRequest, OrganizationUpdateRequest } from './organization.types';

/**
 * Common API Response Types
 */
export interface ApiResponse<T = any> {
  success: number | boolean;
  message?: string;
  data?: T;
}

export interface ApiErrorResponse {
  success: false | 0;
  message: string;
  data?: {
    errors?: Record<string, string[]>;
  };
}

/**
 * Authentication API Types
 */
export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface UserInfoResponse {
  id: string;
  organizationId: string;
  email: string;
  phone: string;
  phoneVerified: boolean;
  fullName: string;
  role: string;
  lastLogin: string | null;
  isActive: boolean;
  passwordChangedAt: string | null;
  createdAt: string;
  updatedAt: string;
  organization: Organization;
  avatarUrl?: string;
  uploadedDocuments?: any[];
}

/**
 * User Management API Types
 */
export interface CreateUserRequest {
  email: string;
  fullName: string;
  role: string;
  phone?: string;
  organizationId?: string;
}

export interface UpdateUserRequest {
  id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}

export interface InviteUserRequest {
  email: string;
  role: string;
  organizationId?: string;
}

/**
 * Organization API Types
 */
export interface OrganizationResponse extends Organization {}

// Type guard
export const isSuccessResponse = (data: any): data is ApiResponse => {
  return data?.success === true || data?.success === 1;
};