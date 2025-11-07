import { USER_KEY } from "@constants/auth-constants";
import { User } from "@models/auth.types";

// Re-export User type as PublicUser for backward compatibility
export type PublicUser = User;

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