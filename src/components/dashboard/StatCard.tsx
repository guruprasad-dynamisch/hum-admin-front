import React from 'react'
import { cn } from '@utils/classNames'

interface StatCardProps {
  title: string
  value: string | number
  change: {
    value: string
    type: 'positive' | 'negative'
  }
  icon: string
  className?: string
}

function StatCard({ title, value, change, icon, className }: StatCardProps) {
  return (
    <div className={cn('stat-card', className)}>
      <div className="stat-header">
        <div className="stat-content">
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
          <div className={cn('stat-change', change.type)}>
            <span>{change.type === 'positive' ? '↑' : '↓'}</span> {change.value}
          </div>
        </div>
        <div className="stat-icon">{icon}</div>
      </div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders when parent re-renders
export default React.memo(StatCard)
