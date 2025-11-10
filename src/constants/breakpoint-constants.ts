/**
 * Breakpoint Constants
 * Centralized breakpoint values for consistent responsive design across the application
 */

export const BREAKPOINTS = {
  /** Mobile breakpoint (768px) */
  MOBILE: 768,
  /** Tablet breakpoint (1024px) */
  TABLET: 1024,
  /** Desktop breakpoint (1280px) */
  DESKTOP: 1280,
  /** Large desktop breakpoint (1536px) */
  LARGE_DESKTOP: 1536,
} as const

/**
 * Media query strings for use in styled-components or CSS-in-JS
 */
export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.MOBILE}px)`,
  tablet: `(max-width: ${BREAKPOINTS.TABLET}px)`,
  desktop: `(min-width: ${BREAKPOINTS.DESKTOP}px)`,
  largeDesktop: `(min-width: ${BREAKPOINTS.LARGE_DESKTOP}px)`,
} as const

/**
 * Helper function to check if current window width matches a breakpoint
 * @param breakpoint - The breakpoint to check against
 * @returns boolean indicating if window width is less than or equal to breakpoint
 */
export const isMobile = (breakpoint: number = BREAKPOINTS.MOBILE): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= breakpoint
}

/**
 * Helper function to check if current window width is tablet or below
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= BREAKPOINTS.TABLET
}

/**
 * Helper function to check if current window width is desktop or above
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= BREAKPOINTS.DESKTOP
}
