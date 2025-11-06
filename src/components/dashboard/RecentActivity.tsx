import { cn } from '@utils/classNames'
import { ActivityItem } from '@constants/dashboard-activities'
import '@styles/components/recent-activity.scss'

interface RecentActivityProps {
  activities: ActivityItem[]
  className?: string
}

export default function RecentActivity({ activities, className }: RecentActivityProps) {
  return (
    <div className={cn('chart-card', className)}>
      <div className="chart-header">
        <div className="chart-title">Recent Activity</div>
      </div>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className={cn('activity-icon', activity.type)}>
              {activity.icon}
            </div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-meta">{activity.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
