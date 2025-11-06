import { Column, Row } from 'react-table'
import { Session } from '@components/settings/SessionsTab'
import DeviceCell from '@components/tables/cells/DeviceCell'
import StatusBadgeCell from '@components/tables/cells/StatusBadgeCell'
import SessionActionCell from '@components/tables/cells/SessionActionCell'

interface ColumnHandlers {
  onRevokeSession?: (sessionId: string) => void
}

export const getSessionColumns = (handlers?: ColumnHandlers): Column<Session>[] => [
  {
    Header: 'Device',
    accessor: 'device',
    Cell: ({ row }: { row: Row<Session> }) => (
      <DeviceCell
        device={row.original.device}
        deviceIcon={row.original.deviceIcon}
        deviceInfo={row.original.deviceInfo}
      />
    )
  },
  {
    Header: 'Location',
    accessor: 'location'
  },
  {
    Header: 'IP Address',
    accessor: 'ipAddress'
  },
  {
    Header: 'Last Active',
    accessor: 'lastActive'
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }: { value: 'active' | 'expired' }) => (
      <StatusBadgeCell status={value} />
    )
  },
  {
    Header: 'Action',
    id: 'actions',
    Cell: ({ row }: { row: Row<Session> }) => (
      <SessionActionCell
        sessionId={row.original.id}
        isCurrent={row.original.isCurrent}
        status={row.original.status}
        onRevoke={handlers?.onRevokeSession}
      />
    )
  }
]
