import { USER_KEY } from "@constants/auth-constants";
import { Role } from "@constants/roles";

export type PublicUser = {
  id: string;
  name: string;
  username?: string; // Made optional to support email-based login
  email?: string;
  userType?: Role;
}

/**
 * SECURITY NOTE: Tokens are stored in httpOnly cookies by the backend.
 * They are NOT accessible via JavaScript, which protects against XSS attacks.
 * The browser automatically sends these cookies with each request.
 */

export function clearAuthData() {
  // Clear user data from storage
  // Note: Tokens are in httpOnly cookies and will be cleared by backend on logout
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function setUser(user: PublicUser, rememberMe = false) {
  const data = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem(USER_KEY, data);
  } else {
    sessionStorage.setItem(USER_KEY, data);
  }
}

export function getUser(): PublicUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    
    // Handle edge cases: null, empty string, or "undefined" string
    if (!raw || raw === 'undefined' || raw === 'null') {
      return null;
    }
    
    return JSON.parse(raw) as PublicUser;
  } catch (error) {
    // If JSON parsing fails, clear the invalid data and return null
    console.error('Failed to parse user data:', error);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
    return null;
  }
}

/**
 * Check if user is authenticated by verifying user data exists
 * Actual token validation is done server-side via httpOnly cookies
 */
export function isAuthenticated(): boolean {
  return getUser() !== null;
}
