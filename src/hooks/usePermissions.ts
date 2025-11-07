import { useSelector } from 'react-redux';
import { selectUser } from '@redux/slices/authSlice';
import { Role } from '@constants/roles';
import { 
  Permission, 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions,
  getPermissionsForRole 
} from '@constants/permissions';

/**
 * Hook for checking user permissions and roles
 * 
 * Usage Examples:
 * 
 * const { can, canAny, canAll, hasRole, hasAnyRole, userRole, allPermissions } = usePermissions();
 * 
 * // Check single permission
 * if (can(Permission.EDIT_FILES)) {
 *   // Show edit button
 * }
 * 
 * // Check any of multiple permissions
 * if (canAny([Permission.EDIT_FILES, Permission.DELETE_FILES])) {
 *   // Show file actions
 * }
 * 
 * // Check all permissions required
 * if (canAll([Permission.EDIT_FILES, Permission.DELETE_FILES])) {
 *   // Show advanced actions
 * }
 * 
 * // Check role
 * if (hasRole(Role.ADMIN)) {
 *   // Admin-specific logic
 * }
 * 
 * // Check any of multiple roles
 * if (hasAnyRole([Role.ADMIN, Role.SUPER_ADMIN])) {
 *   // Management logic
 * }
 */
export const usePermissions = () => {
  const user = useSelector(selectUser);

  /**
   * Check if user has a specific permission
   */
  const can = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  /**
   * Check if user has any of the specified permissions
   */
  const canAny = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAnyPermission(user.role, permissions);
  };

  /**
   * Check if user has all of the specified permissions
   */
  const canAll = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAllPermissions(user.role, permissions);
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (role: Role): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles: Role[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  /**
   * Get current user's role
   */
  const userRole = user?.role || null;

  /**
   * Get all permissions for current user's role
   */
  const allPermissions = user ? getPermissionsForRole(user.role) : [];

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!user;

  return {
    can,
    canAny,
    canAll,
    hasRole,
    hasAnyRole,
    userRole,
    allPermissions,
    isAuthenticated,
  };
};

export default usePermissions;
