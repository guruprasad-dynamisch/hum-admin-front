import { useState, useEffect } from 'react'
import { PrimaryBtn } from '@components/buttons'
import { PageTopBar, LiveBadge, AuditFilters, AuditTimelineItem } from '@components/common'
import type { AuditLog } from '@components/common/AuditTimelineItem'
import '@styles/pages/audit.scss'

export default function Audit() {
  const [expandedId, setExpandedId] = useState<number | string | null>(null)
  const [dateRange, setDateRange] = useState('last24hours')
  const [userFilter, setUserFilter] = useState('')
  const [actionFilter, setActionFilter] = useState('')
  const [moduleFilter, setModuleFilter] = useState('')
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])

  // Mock audit logs data
  const initialLogs: AuditLog[] = [
    {
      id: 1,
      type: 'create',
      user: 'Alice Adams',
      action: 'User Created',
      module: 'Users',
      details: 'Created new user: bob@example.com',
      time: '2 minutes ago',
      ip: '192.168.1.42',
      data: { userId: 'user_123', email: 'bob@example.com', role: 'user' }
    },
    {
      id: 2,
      type: 'update',
      user: 'Bob Brown',
      action: 'Template Updated',
      module: 'Templates',
      details: 'Modified template: Customer Onboarding',
      time: '15 minutes ago',
      ip: '192.168.1.50',
      data: { templateId: 'tpl_456', name: 'Customer Onboarding', changes: ['description', 'content'] }
    },
    {
      id: 3,
      type: 'login',
      user: 'Carol Clark',
      action: 'User Login',
      module: 'Auth',
      details: 'Successful login from Chrome/Windows',
      time: '1 hour ago',
      ip: '10.0.0.25',
      data: { sessionId: 'sess_789', browser: 'Chrome', os: 'Windows' }
    },
    {
      id: 4,
      type: 'delete',
      user: 'Alice Adams',
      action: 'User Deleted',
      module: 'Users',
      details: 'Deleted user: john@old.com',
      time: '3 hours ago',
      ip: '192.168.1.42',
      data: { userId: 'user_999', email: 'john@old.com' }
    },
    {
      id: 5,
      type: 'create',
      user: 'Bob Brown',
      action: 'Template Created',
      module: 'Templates',
      details: 'Created new template: Sales Pitch',
      time: '5 hours ago',
      ip: '192.168.1.50',
      data: { templateId: 'tpl_888', name: 'Sales Pitch', department: 'Sales' }
    },
    {
      id: 6,
      type: 'update',
      user: 'Carol Clark',
      action: 'Settings Updated',
      module: 'Settings',
      details: 'Changed notification preferences',
      time: '1 day ago',
      ip: '10.0.0.25',
      data: { settings: { emailNotifs: true, pushNotifs: false } }
    },
    {
      id: 7,
      type: 'login',
      user: 'David Davis',
      action: 'Admin Login',
      module: 'Auth',
      details: 'Admin access from Firefox/Mac',
      time: '2 days ago',
      ip: '192.168.1.100',
      data: { sessionId: 'sess_101', browser: 'Firefox', os: 'MacOS' }
    },
    {
      id: 8,
      type: 'create',
      user: 'Emma Evans',
      action: 'Report Generated',
      module: 'Reports',
      details: 'Generated monthly analytics report',
      time: '2 days ago',
      ip: '10.0.0.50',
      data: { reportId: 'rpt_202', type: 'analytics', period: 'monthly' }
    },
    {
      id: 9,
      type: 'update',
      user: 'Frank Foster',
      action: 'Role Modified',
      module: 'Users',
      details: 'Updated user role from viewer to editor',
      time: '3 days ago',
      ip: '192.168.1.75',
      data: { userId: 'user_456', oldRole: 'viewer', newRole: 'editor' }
    },
    {
      id: 10,
      type: 'delete',
      user: 'Grace Green',
      action: 'File Deleted',
      module: 'Storage',
      details: 'Removed outdated backup file',
      time: '3 days ago',
      ip: '10.0.0.80',
      data: { fileId: 'file_789', fileName: 'backup_old.zip', size: '2.5GB' }
    },
    {
      id: 11,
      type: 'create',
      user: 'Henry Hill',
      action: 'API Key Created',
      module: 'API',
      details: 'Generated new API key for integration',
      time: '4 days ago',
      ip: '192.168.1.120',
      data: { keyId: 'key_303', permissions: ['read', 'write'] }
    },
    {
      id: 12,
      type: 'login',
      user: 'Ivy Irving',
      action: 'User Login',
      module: 'Auth',
      details: 'Login from mobile device',
      time: '5 days ago',
      ip: '10.0.0.90',
      data: { sessionId: 'sess_404', device: 'mobile', os: 'iOS' }
    }
  ]

  useEffect(() => {
    setAuditLogs(initialLogs)

    // Simulate real-time updates every 10 seconds
    const interval = setInterval(() => {
      const newLog: AuditLog = {
        id: Date.now(),
        type: ['create', 'update', 'login'][Math.floor(Math.random() * 3)] as any,
        user: ['Alice Adams', 'Bob Brown', 'Carol Clark'][Math.floor(Math.random() * 3)]!,
        action: 'New Activity',
        module: 'System',
        details: 'Real-time event detected',
        time: 'Just now',
        ip: '192.168.1.' + Math.floor(Math.random() * 255),
        data: { timestamp: new Date().toISOString() }
      }
      setAuditLogs(prev => [newLog, ...prev.slice(0, 19)])
    }, 1000000)

    return () => clearInterval(interval)
  }, [])

  function handleExportLogs() {
    const csv = [
      ['Time', 'User', 'Action', 'Module', 'Details', 'IP'],
      ...auditLogs.map(l => [l.time, l.user, l.action, l.module, l.details, l.ip])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit_logs_${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleToggle = (id: number | string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Filter logs based on selected filters
  const filteredLogs = auditLogs.filter(log => {
    if (userFilter && !log.user.toLowerCase().includes(userFilter.toLowerCase())) return false
    if (actionFilter && log.type !== actionFilter) return false
    if (moduleFilter && !log.module.toLowerCase().includes(moduleFilter.toLowerCase())) return false
    return true
  })

  return (
    <>
      <PageTopBar
        leftContent={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="page-title">Audit Trail</div>
            <LiveBadge />
          </div>
        }
        rightContent={
          <div className='d-flex align-items-center gap-2'>
            <PrimaryBtn onClick={handleExportLogs}>
              📥 Export Logs
            </PrimaryBtn>
          </div>
        }
      />

      <div className="audit-page-content">
        <AuditFilters
          dateRange={dateRange}
          userFilter={userFilter}
          actionFilter={actionFilter}
          moduleFilter={moduleFilter}
          onDateRangeChange={setDateRange}
          onUserFilterChange={setUserFilter}
          onActionFilterChange={setActionFilter}
          onModuleFilterChange={setModuleFilter}
        />

        <div className="audit-grid">
          {filteredLogs.length > 0 ? (
            filteredLogs.map(log => (
              <AuditTimelineItem
                key={log.id}
                log={log}
                isExpanded={expandedId === log.id}
                onToggle={() => handleToggle(log.id)}
              />
            ))
          ) : (
            <div className="no-results">
              <p>No audit logs found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
