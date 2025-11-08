import { usePageTitle } from '@hooks/usePageTitle';

/**
 * Component that automatically updates the document title based on the current route.
 * Should be placed in the routing context to work properly.
 * 
 * @example
 * // In your router or layout
 * <PageTitle />
 */
export default function PageTitle() {
  usePageTitle();
  return null;
}
