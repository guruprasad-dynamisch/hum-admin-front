export interface ChartDataPoint {
  label: string
  value: number
}

export interface UsageChartData {
  daily: ChartDataPoint[]
  weekly: ChartDataPoint[]
  monthly: ChartDataPoint[]
}

export const USAGE_CHART_DATA: UsageChartData = {
  daily: [
    { label: '00:00', value: 45 },
    { label: '04:00', value: 32 },
    { label: '08:00', value: 78 },
    { label: '12:00', value: 95 },
    { label: '16:00', value: 112 },
    { label: '20:00', value: 88 },
    { label: '23:59', value: 56 }
  ],
  weekly: [
    { label: 'Mon', value: 420 },
    { label: 'Tue', value: 380 },
    { label: 'Wed', value: 510 },
    { label: 'Thu', value: 490 },
    { label: 'Fri', value: 560 },
    { label: 'Sat', value: 340 },
    { label: 'Sun', value: 280 }
  ],
  monthly: [
    { label: 'Jan', value: 2400 },
    { label: 'Feb', value: 2200 },
    { label: 'Mar', value: 2800 },
    { label: 'Apr', value: 2600 },
    { label: 'May', value: 3100 },
    { label: 'Jun', value: 2900 },
    { label: 'Jul', value: 3200 },
    { label: 'Aug', value: 3400 },
    { label: 'Sep', value: 3000 },
    { label: 'Oct', value: 3300 },
    { label: 'Nov', value: 3500 },
    { label: 'Dec', value: 3700 }
  ]
}
