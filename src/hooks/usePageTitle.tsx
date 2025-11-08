import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { formatPageTitle } from '@constants/app-constants';
import { publicRoutes } from '@routes/publicRoutes';
import { protectedRoutes } from '@routes/protectedRoutes';
import { flattenRoutes } from '@utils/helpers';
import { PublicRouteConfig, ProtectedRouteConfig } from '@routes/types';

/**
 * Custom hook to automatically update the document title based on the current route.
 * Searches for a matching route by path and uses its title property.
 * Falls back to app name if no title is found.
 * 
 * @example
 * // In a component or layout
 * usePageTitle();
 * 
 * @example
 * // Override with custom title
 * usePageTitle('Custom Page Title');
 */
export function usePageTitle(customTitle?: string) {
  const location = useLocation();

  useEffect(() => {
    // If custom title is provided, use it
    if (customTitle) {
      document.title = formatPageTitle(customTitle);
      return;
    }

    // Get current path without query params and hash
    const currentPath = location.pathname;

    // Flatten all routes
    const allRoutes = [
      ...flattenRoutes(publicRoutes as PublicRouteConfig[]),
      ...flattenRoutes(protectedRoutes as ProtectedRouteConfig[])
    ];

    // Find matching route by path
    // Handle both absolute paths (/login) and relative paths (dashboard)
    const matchedRoute = allRoutes.find(route => {
      const routePath = route.path.startsWith('/') ? route.path : `/${route.path}`;
      
      // Exact match
      if (routePath === currentPath) return true;
      
      // Match with trailing slash
      if (routePath === currentPath + '/' || routePath + '/' === currentPath) return true;
      
      // Match dynamic routes (e.g., /users/:id)
      const pathPattern = routePath.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pathPattern}$`);
      return regex.test(currentPath);
    });

    // Set document title
    const pageTitle = matchedRoute?.title;
    document.title = formatPageTitle(pageTitle);
  }, [location.pathname, customTitle]);
}

/**
 * Hook to manually set page title with app name formatting
 * 
 * @param title - The page title to set
 * 
 * @example
 * useSetPageTitle('User Profile');
 * // Sets document.title to "User Profile - Humanistics AI"
 */
export function useSetPageTitle(title?: string) {
  useEffect(() => {
    document.title = formatPageTitle(title);
  }, [title]);
}
