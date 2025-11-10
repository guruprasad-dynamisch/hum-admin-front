import { USER_KEY, REMEMBER_ME_KEY } from "@constants/auth-constants";
import { User } from "@models/auth.types";
import moment from 'moment';
import { REMEMBER_ME_DURATION } from '@config/config';

// Re-export User type as PublicUser for backward compatibility
export type PublicUser = User;

/**
 * Remember Me Session Interface
 */
export interface RememberMeSession {
  enabled: boolean;
  loginDateTime: string; // ISO 8601 format
}

/**
 * Parse remember me duration from env format (7d, 15d, 1m, 1y) to moment duration
 * @param duration - Duration string from env (e.g., "7d", "1m", "1y")
 * @returns Object with amount and unit for moment.js
 */
function parseRememberMeDuration(duration: string): { amount: number; unit: moment.unitOfTime.DurationConstructor } {
  const match = duration.match(/^(\d+)(d|m|y)$/);
  
  if (!match || !match[1]) {
    console.warn(`Invalid REMEMBER_ME_DURATION format: ${duration}. Using default 7d.`);
    return { amount: 7, unit: 'days' };
  }

  const amount = parseInt(match[1], 10);
  const unitChar = match[2];

  const unitMap: Record<string, moment.unitOfTime.DurationConstructor> = {
    'd': 'days',
    'm': 'months',
    'y': 'years'
  };

  return { amount, unit: unitMap[unitChar as keyof typeof unitMap] || 'days' };
}

/**
 * Clear all authentication data from storage
 */
export function clearAuthData() {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
  localStorage.removeItem(REMEMBER_ME_KEY);
}

/**
 * Store user data in appropriate storage based on remember me preference
 * @param user - User object to store
 * @param rememberMe - Whether to use localStorage (true) or sessionStorage (false)
 */
export function setUser(user: PublicUser, rememberMe = false) {
  const data = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem(USER_KEY, data);
  } else {
    sessionStorage.setItem(USER_KEY, data);
  }
}

/**
 * Store remember me session data with login timestamp
 * @param rememberMe - Whether remember me is enabled
 */
export function setRememberMeSession(rememberMe: boolean) {
  const session: RememberMeSession = {
    enabled: rememberMe,
    loginDateTime: moment().toISOString()
  };
  localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(session));
}

/**
 * Get remember me session data from storage
 * @returns RememberMeSession object or null if not found
 */
export function getRememberMeSession(): RememberMeSession | null {
  try {
    const data = localStorage.getItem(REMEMBER_ME_KEY);
    if (!data) return null;
    return JSON.parse(data) as RememberMeSession;
  } catch (error) {
    console.error('Error parsing remember me session:', error);
    return null;
  }
}

/**
 * Check if remember me session is still valid based on configured duration
 * @returns true if session is valid, false if expired or not found
 */
export function isRememberMeSessionValid(): boolean {
  const session = getRememberMeSession();
  
  if (!session || !session.enabled) {
    return false;
  }

  try {
    const loginDateTime = moment(session.loginDateTime);
    const currentDateTime = moment();
    
    // Parse duration from env
    const { amount, unit } = parseRememberMeDuration(REMEMBER_ME_DURATION);
    
    // Calculate expiration date
    const expirationDateTime = loginDateTime.add(amount, unit);
    
    // Check if current time is before expiration
    const isValid = currentDateTime.isBefore(expirationDateTime);
    
    if (!isValid) {
      console.log('Remember me session expired');
    }
    
    return isValid;
  } catch (error) {
    console.error('Error checking remember me session validity:', error);
    return false;
  }
}

/**
 * Clear remember me session data
 */
export function clearRememberMeSession() {
  localStorage.removeItem(REMEMBER_ME_KEY);
}

/**
 * Get user data from storage (checks localStorage first, then sessionStorage)
 * @returns User object or null if not found
 */
export function getUser(): PublicUser | null {
  try {
    // Check localStorage first (remember me)
    let data = localStorage.getItem(USER_KEY);
    if (data) {
      return JSON.parse(data) as PublicUser;
    }
    
    // Check sessionStorage (non-remember me)
    data = sessionStorage.getItem(USER_KEY);
    if (data) {
      return JSON.parse(data) as PublicUser;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing user data from storage:', error);
    return null;
  }
}