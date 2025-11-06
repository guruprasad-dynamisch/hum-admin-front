// Chart color constants - Matches SCSS variables from _variables.scss
export const CHART_COLORS = {
  // Primary colors
  primaryGold: '#e2c36a',
  primaryGoldDark: '#c9a556',
  primaryGoldLight: 'rgba(226, 195, 106, 0.1)',
  primaryGoldMedium: 'rgba(226, 195, 106, 0.3)',
  primaryGoldSemi: 'rgba(226, 195, 106, 0.5)',
  primaryGoldBar: 'rgba(226, 195, 106, 0.8)',
  
  // Background colors
  bgPrimary: '#0a0a0a',
  bgSecondary: '#1a1a1a',
  bgTertiary: '#2a2a2a',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#888888',
  textTertiary: '#555555',
  
  // Border colors
  borderDefault: '#2a2a2a',
  borderHover: '#e2c36a'
} as const

export type ChartColorKey = keyof typeof CHART_COLORS
