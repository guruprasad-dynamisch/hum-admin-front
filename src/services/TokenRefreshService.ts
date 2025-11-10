import axios, { AxiosInstance } from 'axios';
import { API_URL, API_TIMEOUT } from '@config/config';
import { AUTH_APIS } from '@constants/auth-constants';

/**
 * TokenRefreshService - Manages token refresh logic with concurrency safety
 * 
 * Replaces global mutable flags with a class-based approach for better
 * encapsulation and testability. Ensures only one refresh request is made
 * at a time, even with concurrent failed requests.
 */
class TokenRefreshService {
  private refreshPromise: Promise<void> | null = null;
  private refreshClient: AxiosInstance;

  constructor() {
    // Create dedicated axios instance for refresh requests
    // This prevents interceptor loops
    this.refreshClient = axios.create({
      baseURL: API_URL,
      timeout: API_TIMEOUT,
      withCredentials: true, // Required for httpOnly cookies
    });
  }

  /**
   * Refresh the access token using the refresh token in httpOnly cookie
   * 
   * @returns Promise that resolves when refresh is complete
   * @throws Error if refresh fails
   */
  async refresh(): Promise<void> {
    // If refresh is already in progress, return the existing promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    // Create new refresh promise
    this.refreshPromise = this.performRefresh();

    try {
      await this.refreshPromise;
    } finally {
      // Clear the promise after completion (success or failure)
      this.refreshPromise = null;
    }
  }

  /**
   * Performs the actual token refresh request
   * 
   * @private
   */
  private async performRefresh(): Promise<void> {
    try {
      // Call refresh endpoint - new tokens will be set in httpOnly cookies
      await this.refreshClient.get(AUTH_APIS.refreshTokenApi);
    } catch (error) {
      // Clear promise on error so next attempt can try again
      this.refreshPromise = null;
      throw error;
    }
  }

  /**
   * Check if a refresh is currently in progress
   * 
   * @returns true if refresh is in progress
   */
  isRefreshing(): boolean {
    return this.refreshPromise !== null;
  }

  /**
   * Reset the service state (useful for testing or logout)
   */
  reset(): void {
    this.refreshPromise = null;
  }
}

// Export singleton instance
export const tokenRefreshService = new TokenRefreshService();

// Export class for testing
export default TokenRefreshService;
