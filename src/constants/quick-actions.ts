import { getRouteByKey } from "@utils/helpers"

export interface QuickActionData {
  id: string
  title: string
  icon: string
//   path: string
}

export const QUICK_ACTIONS: QuickActionData[] = [
  {
    id: 'add-user',
    title: 'Add User',
    icon: '👤',
    // path: getRouteByKey('users')
  },
  {
    id: 'create-template',
    title: 'Create Template',
    icon: '📄',
    // path: getRouteByKey('templates')
  },
  {
    id: 'view-reports',
    title: 'View Reports',
    icon: '📊',
    // path: getRouteByKey('costing')
  },
  {
    id: 'audit-logs',
    title: 'Audit Logs',
    icon: '🔍',
    // path: getRouteByKey('audit')
  }
]
