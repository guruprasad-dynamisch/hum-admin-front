import { getRouteByKey } from '@utils/helpers'
import { Role } from './roles'
import React from 'react'

// Base properties shared by all navigation items
interface NavigationItemBase {
  id: string
  label: string
  icon: React.ReactNode
  roles: Role[] // Empty array means accessible to all roles
  children?: NavigationItem[]
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

// Navigation item with a path (link)
interface NavigationItemWithPath extends NavigationItemBase {
  path: string
  popupComponent?: never
}

// Navigation item with a popup component
interface NavigationItemWithPopup extends NavigationItemBase {
  path?: never
  popupComponent: React.ComponentType<any>
}

// Discriminated union: must have either path OR popupComponent
export type NavigationItem = NavigationItemWithPath | NavigationItemWithPopup

export const TOP_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: getRouteByKey('dashboard'),
    icon: '📊',
    roles: []
  },
  {
    id: 'users',
    label: 'User Management',
    path: getRouteByKey('users'),
    icon: '👥',
    roles: []
  },
  {
    id: 'templates',
    label: 'Templates',
    path: getRouteByKey('templates'),
    icon: '📝',
    roles: []
  },
  {
    id: 'audit',
    label: 'Audit Trail',
    path: getRouteByKey('audit'),
    icon: '🔍',
    roles: []
  },
  {
    id: 'costing',
    label: 'Cost Reports',
    path: getRouteByKey('costing'),
    icon: '💰',
    roles: []
  },
  {
    id: 'settings',
    label: 'Settings',
    path: getRouteByKey('settings'),
    icon: '⚙️',
    roles: []
  },
]

export const BOTTOM_NAVIGATION_ITEMS: NavigationItem[] = []

// Filter navigation items based on user role (recursively handles children)
export function getNavigationForRole(userRole: Role, items: NavigationItem[]): NavigationItem[] {
  return items
    .filter(item => {
      // If roles array is empty, accessible to all
      if (item.roles.length === 0) return true
      // Otherwise check if user has required role
      return item.roles.includes(userRole)
    })
    .map(item => {
      // Recursively filter children if they exist
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: getNavigationForRole(userRole, item.children)
        }
      }
      return item
    })
}

// Get both top and bottom navigation filtered by role
export function getAllNavigationForRole(userRole: Role) {
  return {
    top: getNavigationForRole(userRole, TOP_NAVIGATION_ITEMS),
    bottom: getNavigationForRole(userRole, BOTTOM_NAVIGATION_ITEMS)
  }
}
