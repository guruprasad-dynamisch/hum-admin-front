import React, { useRef, useState, useMemo, useCallback } from 'react'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler, ChartOptions
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import { cn } from '@utils/classNames'
import { CHART_COLORS } from '@constants/chart-colors'
import TextBtn from '@components/buttons/TextBtn'
import ChartErrorBoundary from '@components/common/ChartErrorBoundary'
import '@styles/components/chart-error-boundary.scss'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface FilterOption {
  label: string
  value: string
}

interface ChartData {
  labels: string[]
  values: number[]
}

interface DashboardChartProps {
  title: string
  filters?: FilterOption[]
  data: Record<string, ChartData>
  defaultFilter?: string
  type?: 'line' | 'bar'
  className?: string
}

function DashboardChart({
  title,
  filters = [],
  data,
  defaultFilter,
  type = 'line',
  className
}: DashboardChartProps) {
  const [activeFilter, setActiveFilter] = useState(defaultFilter || filters[0]?.value || 'daily')
  const chartRef = useRef(null)

  // Memoize current data to prevent recalculation
  const currentData = useMemo(() => 
    data[activeFilter] || { labels: [], values: [] },
    [data, activeFilter]
  )

  // Memoize chart data configuration
  const chartData = useMemo(() => ({
    labels: currentData.labels,
    datasets: [
      {
        label: title,
        data: currentData.values,
        borderColor: CHART_COLORS.primaryGold,
        backgroundColor: type === 'line'
          ? CHART_COLORS.primaryGoldLight
          : CHART_COLORS.primaryGoldBar,
        borderWidth: 2,
        fill: type === 'line',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: CHART_COLORS.primaryGold,
        pointBorderColor: CHART_COLORS.bgPrimary,
        pointBorderWidth: 2
      }
    ]
  }), [currentData, title, type])

  // Memoize chart options to prevent recreation on every render
  const options: ChartOptions<'line' | 'bar'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 0,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: CHART_COLORS.bgSecondary,
        titleColor: CHART_COLORS.primaryGold,
        bodyColor: CHART_COLORS.textPrimary,
        borderColor: CHART_COLORS.borderDefault,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        border: {
          display: false
        },
        grid: {
          color: CHART_COLORS.borderDefault,
          lineWidth: 1
        },
        ticks: {
          color: CHART_COLORS.textSecondary,
          font: {
            size: 11
          },
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          autoSkipPadding: 10
        }
      },
      y: {
        border: {
          display: false
        },
        grid: {
          color: CHART_COLORS.borderDefault,
          lineWidth: 1
        },
        ticks: {
          color: CHART_COLORS.textSecondary,
          font: {
            size: 11
          },
          maxTicksLimit: 6
        },
        beginAtZero: true
      }
    }
  }), [])

  // Stabilize filter change handler
  const handleFilterChange = useCallback((filterValue: string) => {
    setActiveFilter(filterValue)
  }, [])

  return (
    <div className={cn('chart-card', className)}>
      <div className="chart-header">
        <div className="chart-title">{title}</div>
        {filters.length > 0 && (
          <div className="chart-filters">
            {filters.map((filter) => (
              <TextBtn
                key={filter.value}
                className={cn('filter-btn', {
                  active: activeFilter === filter.value
                })}
                onClick={() => handleFilterChange(filter.value)}
                color="secondary"
              >
                {filter.label}
              </TextBtn>
            ))}
          </div>
        )}
      </div>
      <div className="chart-container">
        <ChartErrorBoundary>
          {type === 'line' ? (
            <Line ref={chartRef} data={chartData} options={options as ChartOptions<'line'>} />
          ) : (
            <Bar ref={chartRef} data={chartData} options={options as ChartOptions<'bar'>} />
          )}
        </ChartErrorBoundary>
      </div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export default React.memo(DashboardChart)
