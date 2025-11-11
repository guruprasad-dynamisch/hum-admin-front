import { HttpCodes } from '../constants/httpcode.constants';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { clearAuthData } from '@utils/auth';
import { API_URL, API_TIMEOUT } from '@config/config';
import { getRouteByKey } from '@utils/helpers';
import { store } from '@redux/store';
import { clearAuthState } from '@redux/slices/authSlice';
import { authEndpoints } from '@constants/auth-constants';
import { logger } from '@utils/logger';
import { tokenRefreshService } from '@services/TokenRefreshService';
import { errorMessages, ErrorTypes, AXIOS_ERROR_CODES } from '@constants/errorHandling';

/**
 * SECURITY: This API client uses httpOnly cookies for authentication.
 * - Access and refresh tokens are stored in httpOnly cookies by the backend
 * - Cookies are automatically sent with each request via withCredentials: true
 * - No tokens are stored in localStorage/sessionStorage (XSS protection)
 * - No Authorization header is needed (tokens are in cookies)
 */

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT, // Environment-specific timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests (CRITICAL for httpOnly cookies)
});

// Response interceptor for error handling and automatic token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle unauthorized errors with automatic token refresh
    if (error.response?.status === HttpCodes.UNAUTHORIZED && originalRequest && !originalRequest._retry) {
      // Skip refresh token logic for authentication endpoints (login, register, etc.)
      const shouldSkipRefresh = authEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));

      if (shouldSkipRefresh) {
        return Promise.reject(error);
      }

      // Mark this request as retried to prevent infinite loops
      originalRequest._retry = true;

      try {
        // Use TokenRefreshService for concurrency-safe token refresh
        // If multiple requests fail simultaneously, only one refresh will occur
        await tokenRefreshService.refresh();

        // Refresh successful, retry the original request with new token (sent via cookie)
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear auth and redirect to login
        logger.error('Token refresh failed', refreshError);

        // Reset the token refresh service
        tokenRefreshService.reset();

        // Clear all auth data (localStorage, sessionStorage, and Redux state)
        clearAuthData();
        store.dispatch(clearAuthState());

        // Only redirect if not already on login page to avoid redirect loops
        const currentPath = window.location.pathname;
        const loginPath = getRouteByKey('login');
        if (currentPath !== loginPath) {
          // Redirect to login page (full page reload to ensure clean state)
          window.location.href = loginPath;
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle network errors and timeouts
    if (!error.response) {
      if (error.code === AXIOS_ERROR_CODES.TIMEOUT) {
        logger.error('Request timeout', { url: originalRequest?.url, timeout: API_TIMEOUT });
        return Promise.reject(new Error(errorMessages[ErrorTypes.NETWORK_ERROR]));
      }
      logger.error('Network error', { message: error.message, url: originalRequest?.url });
      return Promise.reject(new Error(errorMessages[ErrorTypes.NETWORK_ERROR]));
    }

    return Promise.reject(error);
  }
);

export default apiClient;

// Export types for convenience
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig };
