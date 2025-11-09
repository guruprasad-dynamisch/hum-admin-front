/**
 * Authentication Constants
 * 
 * SECURITY: Tokens are stored in httpOnly cookies by the backend.
 * Only user profile data is stored in localStorage/sessionStorage.
 */

// Storage key for user profile data (NOT tokens)
export const USER_KEY = 'hum_user'

// Storage key for remember me session data
export const REMEMBER_ME_KEY = 'hum_remember_me'

/**
 * Authentication API Endpoints
 * These are the source of truth for all auth-related endpoints
 * Used by both auth.ts and axiosInstance.ts to avoid circular dependencies
 */
export const AUTH_APIS = {
  loginApi: "/api/auth/login",
  logoutApi: "/api/auth/logout",
  refreshTokenApi: "/api/auth/refresh-token",
  userInfoApi: "/api/auth/user-info",
};

// These endpoints should return 401 for invalid credentials without triggering refresh
export const authEndpoints = [
  AUTH_APIS.loginApi,
  AUTH_APIS.logoutApi,
  AUTH_APIS.refreshTokenApi,
];