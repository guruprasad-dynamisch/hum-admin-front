import { useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { CHART_COLORS } from '@constants/chart-colors'
import '@styles/components/pie-chart.scss'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartData {
  label: string
  value: number
  color: string
}

interface PieChartProps {
  title: string
  data: PieChartData[]
  showLegend?: boolean
  className?: string
}

export default function PieChart({
  title,
  data,
  showLegend = true,
  className
}: PieChartProps) {
  const chartRef = useRef(null)

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderWidth: 0,
        hoverOffset: 8
      }
    ]
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
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
        callbacks: {
          label: (context) => {
            const label = context.label || ''
            const value = context.parsed || 0
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${percentage}%`
          }
        }
      }
    }
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className={`pie-chart-card ${className || ''}`}>
      <div className="chart-header">
        <div className="chart-title">{title}</div>
      </div>
      <div className="pie-chart-container">
        <div className="chart-wrapper">
          <Doughnut ref={chartRef} data={chartData} options={options} />
        </div>
        {showLegend && (
          <div className="pie-legend">
            {data.map((item, index) => {
              const percentage = ((item.value / total) * 100).toFixed(0)
              return (
                <div key={index} className="legend-item">
                  <div className="legend-label">
                    <div
                      className="legend-color"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.label}</span>
                  </div>
                  <strong>${item.value.toLocaleString()} ({percentage}%)</strong>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
