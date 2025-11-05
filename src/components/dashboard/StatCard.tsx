import { cn } from '@utils/classNames'
import '@styles/components/stat-card.scss'

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

export default function StatCard({ title, value, change, icon, className }: StatCardProps) {
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
