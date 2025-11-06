export interface ActivityItem {
  id: string
  type: 'create' | 'update' | 'delete'
  title: string
  meta: string
  icon: string
}

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: 'create',
    title: 'New user registered',
    meta: 'john.doe@example.com • 2m ago',
    icon: '✓'
  },
  {
    id: '2',
    type: 'update',
    title: 'Template updated',
    meta: 'Customer Onboarding • 15m ago',
    icon: '✎'
  },
  {
    id: '3',
    type: 'create',
    title: 'New organization added',
    meta: 'Beta Corp • 1h ago',
    icon: '+'
  },
  {
    id: '4',
    type: 'delete',
    title: 'User deactivated',
    meta: 'alice@example.com • 3h ago',
    icon: '×'
  }
]
