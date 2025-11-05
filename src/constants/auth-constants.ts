/**
 * Authentication Constants
 * 
 * SECURITY: Tokens are stored in httpOnly cookies by the backend.
 * Only user profile data is stored in localStorage/sessionStorage.
 */

// Storage key for user profile data (NOT tokens)
export const USER_KEY = 'hum_user'

/**
 * Authentication API Endpoints
 * These are the source of truth for all auth-related endpoints
 * Used by both auth.ts and axiosInstance.ts to avoid circular dependencies
 */
export const AUTH_APIS = {
  sendOtpApi: "/api/phone-verification/send",
  verifyOtpApi: "/api/phone-verification/verify",
  registerProfileApi: "/api/auth/register",
  loginApi: "/api/auth/login",
  logoutApi: "/api/auth/logout",
  refreshTokenApi: "/api/auth/refresh-token",
  forgotPasswordApi: "/api/auth/forgot-password",
  verifyResetTokenApi: "/api/auth/verify-reset-token",
  resetPasswordApi: "/api/auth/reset-password",
};

// These endpoints should return 401 for invalid credentials without triggering refresh
export const authEndpoints = [
  AUTH_APIS.loginApi,
  AUTH_APIS.registerProfileApi,
  AUTH_APIS.refreshTokenApi,
  AUTH_APIS.sendOtpApi,
  AUTH_APIS.verifyOtpApi,
  AUTH_APIS.forgotPasswordApi,
  AUTH_APIS.verifyResetTokenApi,
  AUTH_APIS.resetPasswordApi,
];