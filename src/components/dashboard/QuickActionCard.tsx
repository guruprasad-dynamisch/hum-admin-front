import { useNavigate } from 'react-router-dom'
import { cn } from '@utils/classNames'
import '@styles/components/quick-action-card.scss'
import { getRouteByKey } from '@utils/helpers'

interface QuickActionCardProps {
  title: string
  icon: string
  pathId: string
  className?: string
}

export default function QuickActionCard({ title, icon, pathId, className }: QuickActionCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(getRouteByKey(pathId))
  }

  return (
    <div
      className={cn('action-card', className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
    >
      <div className="action-icon">{icon}</div>
      <div className="action-title">{title}</div>
    </div>
  )
}
