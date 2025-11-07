import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@redux/slices/authSlice';
import { Role } from '@constants/roles';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions } from '@constants/permissions';

interface CanProps {
  children: ReactNode;
  
  // Permission-based access
  permission?: Permission;
  permissions?: Permission[];
  
  // Role-based access
  role?: Role;
  roles?: Role[];
  
  // Permission matching strategy (when using permissions array)
  matchAll?: boolean; // If true, user must have ALL permissions. If false, user needs ANY permission
  
  // Fallback content when user doesn't have access
  fallback?: ReactNode;
  
  // Invert the logic (show when user DOESN'T have permission/role)
  not?: boolean;
}

/**
 * Can Component - Conditional rendering based on permissions or roles
 * 
 * Usage Examples:
 * 
 * 1. Single permission check:
 *    <Can permission={Permission.EDIT_FILES}>
 *      <EditButton />
 *    </Can>
 * 
 * 2. Multiple permissions (any):
 *    <Can permissions={[Permission.EDIT_FILES, Permission.DELETE_FILES]}>
 *      <FileActions />
 *    </Can>
 * 
 * 3. Multiple permissions (all required):
 *    <Can permissions={[Permission.EDIT_FILES, Permission.DELETE_FILES]} matchAll>
 *      <AdvancedFileActions />
 *    </Can>
 * 
 * 4. Role-based check:
 *    <Can role={Role.ADMIN}>
 *      <AdminPanel />
 *    </Can>
 * 
 * 5. Multiple roles:
 *    <Can roles={[Role.ADMIN, Role.SUPER_ADMIN]}>
 *      <ManagementPanel />
 *    </Can>
 * 
 * 6. With fallback:
 *    <Can permission={Permission.EDIT_FILES} fallback={<ViewOnlyMessage />}>
 *      <EditButton />
 *    </Can>
 * 
 * 7. Inverted logic:
 *    <Can role={Role.USER} not>
 *      <AdminOnlyFeature />
 *    </Can>
 */
export const Can: React.FC<CanProps> = ({
  children,
  permission,
  permissions,
  role,
  roles,
  matchAll = false,
  fallback = null,
  not = false,
}) => {
  const user = useSelector(selectUser);

  // If no user is logged in, deny access
  if (!user) {
    return <>{not ? children : fallback}</>;
  }

  let hasAccess = false;

  // Check permission-based access
  if (permission) {
    hasAccess = hasPermission(user.role, permission);
  } else if (permissions && permissions.length > 0) {
    hasAccess = matchAll
      ? hasAllPermissions(user.role, permissions)
      : hasAnyPermission(user.role, permissions);
  }
  // Check role-based access
  else if (role) {
    hasAccess = user.role === role;
  } else if (roles && roles.length > 0) {
    hasAccess = roles.includes(user.role);
  }
  // If no conditions specified, deny access by default
  else {
    hasAccess = false;
  }

  // Apply inversion if 'not' is true
  if (not) {
    hasAccess = !hasAccess;
  }

  return <>{hasAccess ? children : fallback}</>;
};

export default Can;
