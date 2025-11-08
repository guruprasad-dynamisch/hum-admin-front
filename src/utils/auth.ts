import { USER_KEY } from "@constants/auth-constants";
import { User } from "@models/auth.types";

// Re-export User type as PublicUser for backward compatibility
export type PublicUser = User;

export function clearAuthData() {
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