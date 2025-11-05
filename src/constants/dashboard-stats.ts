export interface StatCardData {
  id: string
  title: string
  value: string | number
  change: {
    value: string
    type: 'positive' | 'negative'
  }
  icon: string
}

export const DASHBOARD_STATS: StatCardData[] = [
  {
    id: 'total-users',
    title: 'Total Users',
    value: '245',
    change: {
      value: '12% vs last month',
      type: 'positive'
    },
    icon: '👥'
  },
  {
    id: 'active-sessions',
    title: 'Active Sessions',
    value: '1,234',
    change: {
      value: '23% increase',
      type: 'positive'
    },
    icon: '🔥'
  },
  {
    id: 'templates-used',
    title: 'Templates Used',
    value: '456',
    change: {
      value: '8% this week',
      type: 'positive'
    },
    icon: '📝'
  },
  {
    id: 'monthly-cost',
    title: 'Monthly Cost',
    value: '$4,350',
    change: {
      value: '8% savings',
      type: 'negative'
    },
    icon: '💰'
  }
]
