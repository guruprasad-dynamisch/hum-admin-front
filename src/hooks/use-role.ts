import { useMemo } from 'react'
import { useAppSelector } from '@redux/store'
import { selectUser } from '@redux/slices/authSlice'
import { Role, hasRole, hasAnyRole } from '@constants/roles'

export function useRole() {
  const user = useAppSelector(selectUser)
  const userRole = (user?.role as Role) || Role.USER

  return useMemo(() => ({
    role: userRole,
    isUser: userRole === Role.USER,
    isAdmin: userRole === Role.ADMIN,
    isSuperAdmin: userRole === Role.SUPER_ADMIN,
    hasRole: (requiredRole: Role) => hasRole(userRole, requiredRole),
    hasAnyRole: (requiredRoles: Role[]) => hasAnyRole(userRole, requiredRoles),
    canAccess: (allowedRoles: Role[]) => {
      if (allowedRoles.length === 0) return true
      return hasAnyRole(userRole, allowedRoles)
    }
  }), [userRole])
}
