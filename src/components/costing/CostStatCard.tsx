import { cn } from '@utils/classNames'
import '@styles/components/cost-stat-card.scss'

interface CostStatCardProps {
  icon: string
  label: string
  value: string
  change?: {
    value: string
    type: 'positive' | 'negative'
  }
  subtitle?: string
  className?: string
}

export default function CostStatCard({ 
  icon, 
  label, 
  value, 
  change, 
  subtitle,
  className 
}: CostStatCardProps) {
  return (
    <div className={cn('cost-stat-card', className)}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className={cn('stat-change', change.type)}>
          <span>{change.type === 'positive' ? '↑' : '↓'}</span> {change.value}
        </div>
      )}
      {subtitle && !change && (
        <div className="stat-subtitle">{subtitle}</div>
      )}
    </div>
  )
}
