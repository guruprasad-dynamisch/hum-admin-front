import React from 'react'
import '@styles/components/sessions-table.scss'

interface StatusBadgeCellProps {
  status: 'active' | 'expired'
}

export default function StatusBadgeCell({ status }: StatusBadgeCellProps) {
  return (
    <span className={`status-badge ${status}`}>
      {status === 'active' ? 'Active' : 'Expired'}
    </span>
  )
}
