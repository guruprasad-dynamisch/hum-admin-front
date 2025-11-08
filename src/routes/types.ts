import { Role } from '@constants/roles'
import { FC } from 'react'

export type PublicRouteConfig = {
  key: string
  path: string
  title?: string
  element: FC<{}>
  children?: PublicRouteConfig[]
}

export type ProtectedRouteConfig = {
  key: string
  path: string
  title?: string
  element: FC<{}>
  allowedRoles: Role[]
  children?: ProtectedRouteConfig[]
}
