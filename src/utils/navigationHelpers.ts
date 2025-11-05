import React from 'react'
import { NavigationItem } from '@constants/navigation'

/**
 * Type definition for navigation item handlers
 * Maps item IDs to their click handler functions
 */
export type NavigationHandlers = {
  [itemId: string]: (event?: React.MouseEvent<HTMLElement>) => void
}

/**
 * Injects dynamic onClick handlers into navigation items
 * This allows you to add special behavior to specific navigation items
 * without hardcoding them in the component
 * 
 * @param items - Array of navigation items
 * @param handlers - Object mapping item IDs to their click handlers
 * @returns Navigation items with injected handlers
 * 
 * @example
 * const handlers = {
 *   help: (event) => {
 *     setAnchorEl(event.currentTarget)
 *     setPopupOpen(true)
 *   },
 *   settings: (event) => {
 *     // Handle settings click
 *   }
 * }
 * const itemsWithHandlers = injectNavigationHandlers(navItems, handlers)
 */
export function injectNavigationHandlers(
  items: NavigationItem[],
  handlers: NavigationHandlers
): NavigationItem[] {
  return items.map(item => {
    // Check if this item has a handler defined
    if (handlers[item.id]) {
      return {
        ...item,
        onClick: handlers[item.id]
      }
    }
    
    // Recursively handle children if they exist
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: injectNavigationHandlers(item.children, handlers)
      }
    }
    
    return item
  })
}
