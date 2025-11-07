export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.SUPER_ADMIN]: 1,
  [Role.ADMIN]: 2,
  [Role.USER]: 3,
}

// Check if user has required role or higher
export function hasRole(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

// Check if user has any of the required roles
export function hasAnyRole(userRole: Role, requiredRoles: Role[]): boolean {
  return requiredRoles.includes(userRole)
}

export const rolesDisplayName = {
  [Role.SUPER_ADMIN]: 'Super Admin',
  [Role.ADMIN]: 'Admin',
  [Role.USER]: 'User',
}

export function getRoleDisplayName(role: Role): string {
  return rolesDisplayName[role] || 'Unknown Role'
}