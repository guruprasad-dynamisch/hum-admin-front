/**
 * Permission System Usage Examples
 * 
 * This file demonstrates how to use the permission-based access control system.
 * DO NOT import this file in production code - it's for reference only.
 */

import { Can } from '@components/common/Can';
import { usePermissions } from '@hooks/usePermissions';
import { Permission } from '@constants/permissions';
import { Role } from '@constants/roles';

// ============================================================================
// Example 1: Using <Can> component with single permission
// ============================================================================
export const FileEditExample = () => {
  return (
    <div>
      <h2>File Actions</h2>
      
      {/* Only show edit button if user has edit permission */}
      <Can permission={Permission.EDIT_FILES}>
        <button>Edit File</button>
      </Can>

      {/* Only show delete button if user has delete permission */}
      <Can permission={Permission.DELETE_FILES}>
        <button>Delete File</button>
      </Can>
    </div>
  );
};

// ============================================================================
// Example 2: Using <Can> with multiple permissions (ANY)
// ============================================================================
export const FileActionsExample = () => {
  return (
    <div>
      {/* Show if user has EITHER edit OR delete permission */}
      <Can permissions={[Permission.EDIT_FILES, Permission.DELETE_FILES]}>
        <div className="file-actions">
          <h3>File Management</h3>
          <p>You can manage this file</p>
        </div>
      </Can>
    </div>
  );
};

// ============================================================================
// Example 3: Using <Can> with multiple permissions (ALL required)
// ============================================================================
export const AdvancedFileActionsExample = () => {
  return (
    <div>
      {/* Show only if user has BOTH edit AND delete permissions */}
      <Can permissions={[Permission.EDIT_FILES, Permission.DELETE_FILES]} matchAll>
        <div className="advanced-actions">
          <h3>Advanced File Operations</h3>
          <button>Bulk Edit</button>
          <button>Bulk Delete</button>
        </div>
      </Can>
    </div>
  );
};

// ============================================================================
// Example 4: Using <Can> with roles
// ============================================================================
export const AdminPanelExample = () => {
  return (
    <div>
      {/* Show only for ADMIN role */}
      <Can role={Role.ADMIN}>
        <div className="admin-panel">
          <h2>Admin Panel</h2>
        </div>
      </Can>

      {/* Show for ADMIN or SUPER_ADMIN roles */}
      <Can roles={[Role.ADMIN, Role.SUPER_ADMIN]}>
        <div className="management-panel">
          <h2>Management Panel</h2>
        </div>
      </Can>
    </div>
  );
};

// ============================================================================
// Example 5: Using <Can> with fallback content
// ============================================================================
export const FileEditWithFallbackExample = () => {
  return (
    <div>
      <Can 
        permission={Permission.EDIT_FILES}
        fallback={<p className="text-gray-500">You don't have permission to edit files</p>}
      >
        <button className="btn-primary">Edit File</button>
      </Can>
    </div>
  );
};

// ============================================================================
// Example 6: Using <Can> with inverted logic (NOT)
// ============================================================================
export const NonUserContentExample = () => {
  return (
    <div>
      {/* Show only if user is NOT a regular USER (i.e., ADMIN or SUPER_ADMIN) */}
      <Can role={Role.USER} not>
        <div className="admin-features">
          <h3>Admin Features</h3>
          <p>This content is hidden from regular users</p>
        </div>
      </Can>
    </div>
  );
};

// ============================================================================
// Example 7: Using usePermissions hook in component logic
// ============================================================================
export const DynamicPermissionExample = () => {
  const { can, canAny, canAll, hasRole, hasAnyRole, userRole } = usePermissions();

  const handleFileAction = () => {
    if (can(Permission.EDIT_FILES)) {
      console.log('User can edit files');
      // Perform edit action
    } else {
      console.log('User cannot edit files');
      // Show error message
    }
  };

  const renderFileActions = () => {
    if (canAll([Permission.EDIT_FILES, Permission.DELETE_FILES])) {
      return (
        <div>
          <button onClick={handleFileAction}>Edit</button>
          <button>Delete</button>
        </div>
      );
    } else if (can(Permission.EDIT_FILES)) {
      return <button onClick={handleFileAction}>Edit</button>;
    } else {
      return <p>View only</p>;
    }
  };

  return (
    <div>
      <h2>Current Role: {userRole}</h2>
      {renderFileActions()}
      
      {hasAnyRole([Role.ADMIN, Role.SUPER_ADMIN]) && (
        <div className="admin-section">
          <h3>Admin Section</h3>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Example 8: Complex conditional rendering
// ============================================================================
export const ComplexPermissionExample = () => {
  const { can, hasRole, allPermissions } = usePermissions();

  return (
    <div>
      <h2>User Management</h2>

      {/* Create user button */}
      <Can permission={Permission.CREATE_USERS}>
        <button className="btn-primary">Create User</button>
      </Can>

      {/* User list with conditional actions */}
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <Can permission={Permission.EDIT_USERS}>
                <th>Actions</th>
              </Can>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <Can permission={Permission.EDIT_USERS}>
                <td>
                  <button>Edit</button>
                  <Can permission={Permission.DELETE_USERS}>
                    <button className="btn-danger">Delete</button>
                  </Can>
                </td>
              </Can>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Debug info - show all permissions */}
      {hasRole(Role.SUPER_ADMIN) && (
        <div className="debug-info">
          <h3>All Permissions:</h3>
          <ul>
            {allPermissions.map(permission => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Example 9: Navigation menu with permissions
// ============================================================================
export const NavigationExample = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        
        <Can permission={Permission.VIEW_USERS}>
          <li>
            <a href="/users">Users</a>
          </li>
        </Can>

        <Can permission={Permission.VIEW_SESSIONS}>
          <li>
            <a href="/sessions">Sessions</a>
          </li>
        </Can>

        <Can permission={Permission.VIEW_TEMPLATES}>
          <li>
            <a href="/templates">Templates</a>
          </li>
        </Can>

        <Can roles={[Role.ADMIN, Role.SUPER_ADMIN]}>
          <li>
            <a href="/admin">Admin Panel</a>
          </li>
        </Can>

        <Can role={Role.SUPER_ADMIN}>
          <li>
            <a href="/super-admin">Super Admin</a>
          </li>
        </Can>
      </ul>
    </nav>
  );
};

// ============================================================================
// Example 10: Form with conditional fields
// ============================================================================
export const FormExample = () => {
  return (
    <form>
      <div>
        <label>Name</label>
        <input type="text" name="name" />
      </div>

      <div>
        <label>Email</label>
        <input type="email" name="email" />
      </div>

      {/* Only admins can change user roles */}
      <Can permission={Permission.EDIT_USERS}>
        <div>
          <label>Role</label>
          <select name="role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <Can role={Role.SUPER_ADMIN}>
              <option value="SUPER_ADMIN">Super Admin</option>
            </Can>
          </select>
        </div>
      </Can>

      {/* Only super admins can manage organization settings */}
      <Can permission={Permission.MANAGE_ORGANIZATION}>
        <div>
          <label>Organization</label>
          <select name="organization">
            <option>Organization A</option>
            <option>Organization B</option>
          </select>
        </div>
      </Can>

      <button type="submit">Save</button>
    </form>
  );
};
