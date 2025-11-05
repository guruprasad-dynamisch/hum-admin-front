import PageHeader from '@components/common/PageHeader'
import StatCard from '@components/dashboard/StatCard'
import QuickActionCard from '@components/dashboard/QuickActionCard'
import { DASHBOARD_STATS } from '@constants/dashboard-stats'
import { QUICK_ACTIONS } from '@constants/quick-actions'
import '@styles/components/stat-card.scss'
import '@styles/components/quick-action-card.scss'

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Dashboard', active: true }
        ]}
      />
      
      {/* Stats Grid */}
      <div className="stats-grid">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        {QUICK_ACTIONS.map((action) => (
          <QuickActionCard
            key={action.id}
            title={action.title}
            icon={action.icon}
            pathId={action.pathId}
          />
        ))}
      </div>
    </>
  )
}
