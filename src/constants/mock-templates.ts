/**
 * Template type definition
 */
export interface Template {
  id: number
  name: string
  description: string
  department: string
  tags: string[]
  icon: string
  uses: number
  updatedAt: string
  createdAt: string
}

/**
 * Mock template data for development
 */
export const MOCK_TEMPLATES: Template[] = [
  {
    id: 1,
    name: 'Customer Onboarding',
    description: 'Generate personalized onboarding emails for new customers',
    department: 'Sales',
    tags: ['Sales', 'Customer', 'Email'],
    icon: '📧',
    uses: 342,
    updatedAt: '2d ago',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Product Launch',
    description: 'Create product launch announcements and marketing copy',
    department: 'Marketing',
    tags: ['Marketing', 'Product', 'Launch'],
    icon: '🚀',
    uses: 238,
    updatedAt: '5d ago',
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'Sales Pitch',
    description: 'Draft compelling sales pitches for potential clients',
    department: 'Sales',
    tags: ['Sales', 'Pitch'],
    icon: '💼',
    uses: 127,
    updatedAt: '1w ago',
    createdAt: '2024-01-05'
  },
  {
    id: 4,
    name: 'Support Response',
    description: 'Generate helpful customer support responses',
    department: 'Support',
    tags: ['Support', 'Customer'],
    icon: '💬',
    uses: 419,
    updatedAt: '2w ago',
    createdAt: '2023-12-28'
  },
  {
    id: 5,
    name: 'Meeting Summary',
    description: 'Summarize meeting notes and action items',
    department: 'Product',
    tags: ['Productivity', 'Meetings'],
    icon: '📝',
    uses: 156,
    updatedAt: '3d ago',
    createdAt: '2024-01-12'
  },
  {
    id: 6,
    name: 'Email Campaign',
    description: 'Create email marketing campaigns and newsletters',
    department: 'Marketing',
    tags: ['Marketing', 'Email'],
    icon: '📨',
    uses: 89,
    updatedAt: '1w ago',
    createdAt: '2024-01-08'
  },
  {
    id: 7,
    name: 'Bug Report Analysis',
    description: 'Analyze and categorize bug reports from users',
    department: 'Engineering',
    tags: ['Engineering', 'Support'],
    icon: '🐛',
    uses: 203,
    updatedAt: '4d ago',
    createdAt: '2024-01-11'
  },
  {
    id: 8,
    name: 'Content Strategy',
    description: 'Generate content strategy and editorial calendars',
    department: 'Marketing',
    tags: ['Marketing', 'Content'],
    icon: '📅',
    uses: 94,
    updatedAt: '6d ago',
    createdAt: '2024-01-09'
  }
]

/**
 * Department options for filters
 */
export const DEPARTMENT_OPTIONS = [
  { label: 'All Departments', value: '' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Support', value: 'Support' },
  { label: 'Product', value: 'Product' },
  { label: 'Engineering', value: 'Engineering' }
]
