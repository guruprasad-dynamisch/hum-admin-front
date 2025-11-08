import type { CostStat, CostItem, OrganizationCost, CostTrendData } from '@models/costing.types'

/**
 * Mock data for Costing page
 */

export const costStats: CostStat[] = [
  {
    icon: '💰',
    label: 'Total Cost',
    value: '$4,350',
    change: { value: '8.2% vs last month', type: 'negative' }
  },
  {
    icon: '📈',
    label: 'Average Daily Cost',
    value: '$145',
    change: { value: '$5 increase', type: 'positive' }
  },
  {
    icon: '🚀',
    label: 'Top Service',
    value: 'GPT-4 API',
    subtitle: '$2,500 (57.5%)'
  },
  {
    icon: '🔮',
    label: 'Forecast (30d)',
    value: '$4,650',
    subtitle: '85% confidence'
  }
]

export const costTrendData: CostTrendData = {
  daily: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [120, 135, 128, 145, 142, 138, 150]
  },
  weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [980, 1100, 1050, 1220]
  },
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [3200, 3800, 3500, 4100, 3900, 4350]
  }
}

export const costTrendFilters = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
]

export const costItems: CostItem[] = [
  {
    id: '1',
    service: 'GPT-4 API',
    icon: '🤖',
    cost: 2500,
    usage: '142K tokens',
    percentage: 57.5
  },
  {
    id: '2',
    service: 'Claude API',
    icon: '💬',
    cost: 1200,
    usage: '95K tokens',
    percentage: 27.6
  },
  {
    id: '3',
    service: 'Embeddings',
    icon: '📦',
    cost: 450,
    usage: '2.1M tokens',
    percentage: 10.3
  },
  {
    id: '4',
    service: 'Storage',
    icon: '💾',
    cost: 200,
    usage: '450 GB',
    percentage: 4.6
  }
]

export const organizationCostData: OrganizationCost[] = [
  { label: 'Acme Inc', value: 1740, color: '#e2c36a' },
  { label: 'Beta Corp', value: 1305, color: '#c9a556' },
  { label: 'Gamma LLC', value: 870, color: '#FF8C00' },
  { label: 'Others', value: 435, color: '#888888' }
]

export const dateRangeOptions = [
  { label: 'Last 7 Days', value: 'last7' },
  { label: 'Last 30 Days', value: 'last30' },
  { label: 'Last 90 Days', value: 'last90' },
  { label: 'Custom Range', value: 'custom' }
]
