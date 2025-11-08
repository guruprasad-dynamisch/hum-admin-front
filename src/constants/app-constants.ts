/**
 * Application-wide constants
 */

/**
 * The application name used in page titles and branding
 */
export const APP_NAME = 'Humanistics AI';

/**
 * Default page title when no specific route title is available
 */
export const DEFAULT_PAGE_TITLE = APP_NAME;

/**
 * Formats a page title with the app name
 * @param pageTitle - The specific page title (e.g., 'Login', 'Dashboard')
 * @returns Formatted title string (e.g., 'Login - Humanistics AI')
 */
export const formatPageTitle = (pageTitle?: string): string => {
  return pageTitle ? `${pageTitle} - ${APP_NAME}` : DEFAULT_PAGE_TITLE;
};
