import React, { useMemo } from 'react'
import { Card } from '@components/common'
import DataTable from '@components/common/DataTable'
import { getSessionColumns } from '@config/sessions/columnDefinitions'
import '@styles/components/sessions-table.scss'

export interface Session {
  id: string
  device: string
  deviceIcon: string
  deviceInfo?: string
  location: string
  ipAddress: string
  lastActive: string
  status: 'active' | 'expired'
  isCurrent?: boolean
}

export interface SessionsTabProps {
  sessions?: Session[]
  onRevokeSession?: (sessionId: string) => void
}

const SessionsTab: React.FC<SessionsTabProps> = ({
  sessions = [],
  onRevokeSession
}) => {
  const defaultSessions: Session[] = [
    {
      id: '1',
      device: 'Chrome on Windows',
      deviceIcon: '💻',
      deviceInfo: 'Current Session',
      location: 'New York, US',
      ipAddress: '192.168.1.1',
      lastActive: 'Just now',
      status: 'active',
      isCurrent: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      deviceIcon: '📱',
      location: 'New York, US',
      ipAddress: '192.168.1.42',
      lastActive: '2 hours ago',
      status: 'active'
    },
    {
      id: '3',
      device: 'Firefox on Mac',
      deviceIcon: '💻',
      location: 'London, UK',
      ipAddress: '10.0.0.25',
      lastActive: '1 day ago',
      status: 'expired'
    }
  ]

  const displaySessions = sessions.length > 0 ? sessions : defaultSessions

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => getSessionColumns({ onRevokeSession }),
    [onRevokeSession]
  )

  return (
    <Card title="Active Sessions">
      <DataTable
        columns={columns}
        data={displaySessions}
        usePagination={false}
        emptyMessage="No active sessions found"
      />
    </Card>
  )
}

export default SessionsTab
