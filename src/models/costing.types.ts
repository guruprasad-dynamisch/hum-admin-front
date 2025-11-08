/**
 * Type definitions for Costing page
 */

export interface CostStat {
  icon: string
  label: string
  value: string
  change?: {
    value: string
    type: 'positive' | 'negative'
  }
  subtitle?: string
}

export interface CostItem {
  id: string
  service: string
  icon: string
  cost: number
  usage: string
  percentage: number
}

export interface OrganizationCost {
  label: string
  value: number
  color: string
}

export interface ChartDataPoint {
  labels: string[]
  values: number[]
}

export interface CostTrendData {
  daily: ChartDataPoint
  weekly: ChartDataPoint
  monthly: ChartDataPoint
  [key: string]: ChartDataPoint
}

export type DateRangeOption = 'last7' | 'last30' | 'last90' | 'custom'
