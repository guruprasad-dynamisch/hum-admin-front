export interface QuickActionData {
    id: string
    title: string
    icon: string
    pathId: string
}

export const QUICK_ACTIONS: QuickActionData[] = [
    {
        id: 'add-user',
        title: 'Add User',
        icon: '👤',
        pathId: 'users'
    },
    {
        id: 'create-template',
        title: 'Create Template',
        icon: '📄',
        pathId: 'templates'
    },
    {
        id: 'view-reports',
        title: 'View Reports',
        icon: '📊',
        pathId: 'costing'
    },
    {
        id: 'audit-logs',
        title: 'Audit Logs',
        icon: '🔍',
        pathId: 'audit'
    }
]
