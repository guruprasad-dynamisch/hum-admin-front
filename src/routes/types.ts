import { Role } from '@constants/roles'
import { FC } from 'react'

export type PublicRouteConfig = {
  key: string
  path: string
  element: FC<{}>
}

export type ProtectedRouteConfig = {
  key: string
  path: string
  element: FC<{}>
  allowedRoles: Role[]
  children?: ProtectedRouteConfig[]
}
