// Validate API_URL is configured
const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error(
    'VITE_API_URL is not defined. Please check your .env file and ensure VITE_API_URL is set.'
  );
}

export const API_URL = apiUrl;

// Environment-specific configuration
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;

// Timeout configuration (longer in development for debugging)
export const API_TIMEOUT = IS_PRODUCTION ? 10000 : 30000;

/**
 * Remember Me Duration Configuration
 * Supported formats: 7d (7 days), 15d (15 days), 1m (1 month), 1y (1 year)
 * Default: 7d (7 days)
 */
export const REMEMBER_ME_DURATION = import.meta.env.VITE_REMEMBER_ME_DURATION || '7d';