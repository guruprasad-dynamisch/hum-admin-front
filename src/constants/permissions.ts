import { Role } from './roles';

/**
 * Permission enum for granular access control
 * Format: action:resource
 */
export enum Permission {
  // File permissions
  VIEW_FILES = 'view:files',
  EDIT_FILES = 'edit:files',
  DELETE_FILES = 'delete:files',
  UPLOAD_FILES = 'upload:files',
  DOWNLOAD_FILES = 'download:files',

  // User permissions
  VIEW_USERS = 'view:users',
  CREATE_USERS = 'create:users',
  EDIT_USERS = 'edit:users',
  DELETE_USERS = 'delete:users',

  // Session permissions
  VIEW_SESSIONS = 'view:sessions',
  CREATE_SESSIONS = 'create:sessions',
  EDIT_SESSIONS = 'edit:sessions',
  DELETE_SESSIONS = 'delete:sessions',

  // Template permissions
  VIEW_TEMPLATES = 'view:templates',
  CREATE_TEMPLATES = 'create:templates',
  EDIT_TEMPLATES = 'edit:templates',
  DELETE_TEMPLATES = 'delete:templates',

  // Costing permissions
  VIEW_COSTING = 'view:costing',
  EDIT_COSTING = 'edit:costing',

  // Dashboard permissions
  VIEW_DASHBOARD = 'view:dashboard',
  VIEW_ANALYTICS = 'view:analytics',

  // Settings permissions
  VIEW_SETTINGS = 'view:settings',
  EDIT_SETTINGS = 'edit:settings',
  MANAGE_ORGANIZATION = 'manage:organization',
}

/**
 * Base permissions for USER role
 */
const USER_PERMISSIONS: Permission[] = [
  // Files
  Permission.VIEW_FILES,
  Permission.UPLOAD_FILES,
  Permission.DOWNLOAD_FILES,

  // Sessions
  Permission.VIEW_SESSIONS,

  // Templates
  Permission.VIEW_TEMPLATES,

  // Dashboard
  Permission.VIEW_DASHBOARD,

  // Settings (own profile only)
  Permission.VIEW_SETTINGS,
];

/**
 * Additional permissions for ADMIN role (on top of USER permissions)
 */
const ADMIN_ADDITIONAL_PERMISSIONS: Permission[] = [
  // Additional file permissions
  Permission.EDIT_FILES,
  Permission.DELETE_FILES,

  // User management
  Permission.VIEW_USERS,
  Permission.CREATE_USERS,
  Permission.EDIT_USERS,

  // Session management
  Permission.CREATE_SESSIONS,
  Permission.EDIT_SESSIONS,
  Permission.DELETE_SESSIONS,

  // Template management
  Permission.CREATE_TEMPLATES,
  Permission.EDIT_TEMPLATES,
  Permission.DELETE_TEMPLATES,

  // Costing
  Permission.VIEW_COSTING,
  Permission.EDIT_COSTING,

  // Analytics
  Permission.VIEW_ANALYTICS,

  // Settings
  Permission.EDIT_SETTINGS,
];

/**
 * Additional permissions for SUPER_ADMIN role (on top of ADMIN permissions)
 */
const SUPER_ADMIN_ADDITIONAL_PERMISSIONS: Permission[] = [
  // Additional user permissions
  Permission.DELETE_USERS,

  // Organization management
  Permission.MANAGE_ORGANIZATION,
];

/**
 * Role-Permission mapping
 * Defines which permissions each role has
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.USER]: USER_PERMISSIONS,
  [Role.ADMIN]: [...USER_PERMISSIONS, ...ADMIN_ADDITIONAL_PERMISSIONS],
  [Role.SUPER_ADMIN]: [...USER_PERMISSIONS, ...ADMIN_ADDITIONAL_PERMISSIONS, ...SUPER_ADMIN_ADDITIONAL_PERMISSIONS],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

/**
 * Get all permissions for a role
 */
export function getPermissionsForRole(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}
