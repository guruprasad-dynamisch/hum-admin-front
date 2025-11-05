/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
  success: number | boolean;
  message?: string;
  data?: T;
}

/**
 * API error response structure
 */
export interface ApiErrorResponse {
  success: false | 0;
  message: string;
  data?: {
    errors?: Record<string, string[]>;
  };
}

/**
 * Authentication API response types
 */
export interface LoginResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    organizationName?: string;
  };
  accessToken?: string; // May not be present if using httpOnly cookies
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface VerifyResetTokenResponse {
  valid: boolean;
  message?: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface RefreshTokenResponse {
  accessToken?: string;
}

/**
 * User API response types
 */
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
  organization: {
    id: string;
    name: string;
    tier: string;
  };
  uploadedDocuments: any[];
}

/**
 * Type guard to check if response is successful
 */
export const isSuccessResponse = (data: any): data is ApiResponse => {
  return data?.success === true || data?.success === 1;
};
