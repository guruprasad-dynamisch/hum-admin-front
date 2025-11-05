export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.USER]: 1,
  [Role.ADMIN]: 2,
}

// Check if user has required role or higher
export function hasRole(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

// Check if user has any of the required roles
export function hasAnyRole(userRole: Role, requiredRoles: Role[]): boolean {
  return requiredRoles.includes(userRole)
}
