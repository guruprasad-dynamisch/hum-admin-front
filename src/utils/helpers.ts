import { publicRoutes } from "@routes/publicRoutes";
import { protectedRoutes } from "@routes/protectedRoutes";
import { PublicRouteConfig, ProtectedRouteConfig } from "@routes/types";

/**
 * Finds an item in an array by matching a specific key-value pair.
 * 
 * @template T - The type of items in the array
 * @param {T[]} arr - The array to search through
 * @param {keyof T} key - The property key to match against
 * @param {T[keyof T]} value - The value to search for
 * @returns {T | undefined} The found item or undefined if not found
 * 
 * @example
 * const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
 * const user = findByKey(users, 'id', 1); // Returns { id: 1, name: 'John' }
 */
export function findByKey<T>(arr: T[], key: keyof T, value: T[keyof T]): T | undefined {
    return arr.find(item => item[key] === value);
}

/**
 * Flattens a nested route structure into a single-level array.
 * Recursively processes children routes and combines them with parent routes.
 * 
 * @template T - The type of route objects
 * @param {T[]} routes - Array of route objects that may contain nested children
 * @returns {T[]} Flattened array of all routes including nested children
 * 
 * @example
 * const routes = [{ key: 'parent', children: [{ key: 'child' }] }];
 * const flat = flattenRoutes(routes); // Returns [{ key: 'parent', ... }, { key: 'child' }]
 */
export function flattenRoutes<T extends { children?: T[] }>(routes: T[]): T[] {
    const flattened: T[] = [];
    
    routes.forEach(route => {
        flattened.push(route);
        if (route.children && route.children.length > 0) {
            flattened.push(...flattenRoutes(route.children));
        }
    });
    
    return flattened;
}

/**
 * Retrieves a route path by its key from the combined public and protected routes.
 * Supports nested children routes, dynamic parameter replacement, and query parameters.
 * 
 * @param {string} value - The route key to look up (e.g., 'login', 'discoveries', 'discoveriesId')
 * @param {Record<string, string>} [params] - Optional path parameters to replace in the route path
 * @param {Record<string, string>} [queryParams] - Optional query parameters to append to the URL
 * @returns {string} The resolved route path with leading slash, or '/' if route not found
 * 
 * @example
 * // Simple route lookup
 * getRouteByKey('login'); // Returns '/login'
 * 
 * @example
 * // Route with path parameters
 * getRouteByKey('discoveriesId', { id: '123' }); // Returns '/discovery/123'
 * 
 * @example
 * // Route with query parameters
 * getRouteByKey('users', {}, { tab: 'active', page: '2' }); // Returns '/users?tab=active&page=2'
 * 
 * @example
 * // Route with both path and query parameters
 * getRouteByKey('discoveriesId', { id: '123' }, { tab: 'details' }); // Returns '/discovery/123?tab=details'
 * 
 * @example
 * // Remove optional parameters
 * getRouteByKey('user-profile', {}); // Returns '/user' (removes /:id)
 */
export function getRouteByKey(
    value: string, 
    params?: Record<string, string>, 
    queryParams?: Record<string, string>
): string {
    // Flatten all routes including nested children
    const allRoutes = [...flattenRoutes(publicRoutes as any[]), ...flattenRoutes(protectedRoutes as any[])] as any[];
    const item = findByKey(allRoutes, "key", value);

    if (!item?.path) return '/';

    let path = item.path as string;

    // Handle path parameters
    if (params && Object.keys(params).length > 0) {
        Object.entries(params).forEach(([key, val]) => {
            path = path.replace(`:${key}`, val);
        });
    } else if (params && Object.keys(params).length === 0) {
        path = path.replace(/\/:[^/]+/g, '');
    }

    // Ensure path starts with /
    path = path.startsWith("/") ? path : `/${path}`;

    // Handle query parameters
    if (queryParams && Object.keys(queryParams).length > 0) {
        const queryString = new URLSearchParams(queryParams).toString();
        path = `${path}?${queryString}`;
    }

    return path;
}

/**
 * Retrieves the title of a route by its key from the combined public and protected routes.
 * Supports nested children routes.
 * 
 * @param {string} value - The route key to look up (e.g., 'login', 'dashboard', 'users')
 * @returns {string | undefined} The route title if found, undefined otherwise
 * 
 * @example
 * // Get title for a route
 * getRouteTitleByKey('login'); // Returns 'Login'
 * getRouteTitleByKey('dashboard'); // Returns 'Dashboard'
 * getRouteTitleByKey('nonexistent'); // Returns undefined
 */
export function getRouteTitleByKey(value: string): string | undefined {
    // Flatten all routes including nested children
    const allRoutes = [
        ...flattenRoutes(publicRoutes as PublicRouteConfig[]), 
        ...flattenRoutes(protectedRoutes as ProtectedRouteConfig[])
    ];
    const item = findByKey(allRoutes, "key", value);

    return item?.title;
}

export function ucFirstLetter(str:string) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export const cleanErrorMessage = (message: string): string => {
    if (!message) return '';
    return message.replace(/^"([^"]+)"/, (_: string, field: string) => ucFirstLetter(field));
};

export function isTruthyOrOne(value: any): boolean {
    return value === true || value == 1;
}

export function isFalsyOrZero(value: any): boolean {
    return value === false || value == 0;
}

/**
 * Generates user initials from a name string.
 * Takes the first letter of each word (up to 2 words) and converts to uppercase.
 * 
 * @param {string} [name] - The user's full name
 * @param {string} [fallback='AU'] - Fallback initials if name is not provided
 * @returns {string} User initials (max 2 characters)
 * 
 * @example
 * getUserInitials('John Doe'); // Returns 'JD'
 * getUserInitials('Alice'); // Returns 'A'
 * getUserInitials('Bob Smith Johnson'); // Returns 'BS'
 * getUserInitials(); // Returns 'AU'
 * getUserInitials('', 'NA'); // Returns 'NA'
 */
export function getUserInitials(name?: string, fallback: string = 'AU'): string {
    if (!name || name.trim().length === 0) {
        return fallback;
    }

    return name.trim().split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * 
 * @template T - The type of the function to debounce
 * @param {T} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {DebouncedFunction<T>} The debounced function with flush method
 * 
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching for:', query);
 * }, 300);
 * 
 * debouncedSearch('hello'); // Will only execute after 300ms of no calls
 * debouncedSearch.flush(); // Execute immediately
 */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): void;
    flush: () => void;
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): DebouncedFunction<T> {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: Parameters<T> | null = null;

    const debounced = function(...args: Parameters<T>) {
        lastArgs = args;
        
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
            lastArgs = null;
        }, wait);
    } as DebouncedFunction<T>;

    debounced.flush = function() {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        if (lastArgs !== null) {
            func(...lastArgs);
            lastArgs = null;
        }
    };

    return debounced;
}