import { useState } from 'react'
import { PrimaryBtn } from '@components/buttons'
import { PageTopBar } from '@components/common'
import DashboardChart from '@components/dashboard/DashboardChart'
import SelectField from '@components/fields/SelectField'
import {
  CostStatCard,
  CostBreakdownTable,
  PieChart,
  ExportSection
} from '@components/costing'
import {
  costStats,
  costTrendData,
  costTrendFilters,
  costItems,
  organizationCostData,
  dateRangeOptions
} from '@constants/costing-data'
import type { DateRangeOption } from '@models/costing'
import '@styles/pages/costing.scss'

export default function Costing() {
  const [dateRange, setDateRange] = useState<DateRangeOption>('last30')

  function handleExportReport() {
    alert('Generating comprehensive cost report...')
  }

  function handleExport(format: string) {
    alert(`Exporting report as ${format.toUpperCase()}...`)
  }

  function handleDateRangeChange(value: string) {
    setDateRange(value as DateRangeOption)
  }

  return (
    <>
      <PageTopBar
        leftContent={
          <div className="page-title">Cost Reports & Analytics</div>
        }
        rightContent={
          <>
            <SelectField
              mode="standalone"
              options={dateRangeOptions}
              value={dateRange}
              onChange={handleDateRangeChange}
              showLabel={false}
              className="date-range-select-field"
            />
            <PrimaryBtn onClick={handleExportReport}>
              📥 Export Report
            </PrimaryBtn>
          </>
        }
      />

      <div className="costing-page">
        <div className="costing-container">
          {/* Stats Grid */}
          <div className="stats-grid">
            {costStats.map((stat, index) => (
              <CostStatCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                subtitle={stat.subtitle}
              />
            ))}
          </div>

          {/* Cost Trend Chart */}
          <div className="chart-section line-graph">
            <DashboardChart
              title="Cost Trends"
              filters={costTrendFilters}
              data={costTrendData}
              defaultFilter="weekly"
              type="line"
            />
          </div>

          {/* Cost Breakdown */}
          <div className="cost-breakdown">
            <div className="chart-section">
              <h3 className='cost-breakdown-heading'>
                Top Cost Items
              </h3>
              <CostBreakdownTable items={costItems} />
            </div>

            <PieChart
              title="Cost by Organization"
              data={organizationCostData}
              showLegend={true}
            />
          </div>

          {/* Export Section */}
          <ExportSection onExport={handleExport} />
        </div>
      </div>
    </>
  )
}
