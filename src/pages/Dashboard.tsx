import PageHeader from '@components/common/PageHeader'
import StatCard from '@components/dashboard/StatCard'
import QuickActionCard from '@components/dashboard/QuickActionCard'
import DashboardChart from '@components/dashboard/DashboardChart'
import RecentActivity from '@components/dashboard/RecentActivity'
import { DASHBOARD_STATS } from '@constants/dashboard-stats'
import { QUICK_ACTIONS } from '@constants/quick-actions'
import { USAGE_CHART_DATA } from '@constants/dashboard-chart-data'
import { RECENT_ACTIVITIES } from '@constants/dashboard-activities'
import '@styles/components/stat-card.scss'
import '@styles/components/quick-action-card.scss'
import '@styles/components/dashboard-chart.scss'
import '@styles/components/recent-activity.scss'
import DashboardHeader from '@components/dashboard/DashboardHeader'

export default function Dashboard() {
  // Transform chart data for the component
  const usageChartData = {
    daily: {
      labels: USAGE_CHART_DATA.daily.map(d => d.label),
      values: USAGE_CHART_DATA.daily.map(d => d.value)
    },
    weekly: {
      labels: USAGE_CHART_DATA.weekly.map(d => d.label),
      values: USAGE_CHART_DATA.weekly.map(d => d.value)
    },
    monthly: {
      labels: USAGE_CHART_DATA.monthly.map(d => d.label),
      values: USAGE_CHART_DATA.monthly.map(d => d.value)
    }
  }

  return (
    <>
      {/* Top Bar */}
      <DashboardHeader />

      {/*Page Header*/}
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

      {/* Charts Grid */}
      <div className="charts-grid">
        <DashboardChart
          title="Usage Trends"
          filters={[
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' }
          ]}
          data={usageChartData}
          defaultFilter="daily"
          type="line"
        />
        <RecentActivity activities={RECENT_ACTIVITIES} />
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
