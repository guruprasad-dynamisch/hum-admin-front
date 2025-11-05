/**
 * Utility function for conditionally joining class names together
 * Similar to the 'classnames' npm package
 * 
 * @example
 * // Simple usage
 * cn('foo', 'bar') // 'foo bar'
 * 
 * @example
 * // With conditionals
 * cn('foo', isActive && 'active') // 'foo active' or 'foo'
 * 
 * @example
 * // With objects
 * cn('foo', { active: isActive, disabled: isDisabled })
 * 
 * @example
 * // With arrays
 * cn(['foo', 'bar'], 'baz') // 'foo bar baz'
 * 
 * @example
 * // Mixed usage
 * cn('btn', {
 *   'btn-primary': isPrimary,
 *   'btn-disabled': isDisabled
 * }, isLarge && 'btn-lg')
 */

type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | ClassObject 
  | ClassArray

interface ClassObject {
  [key: string]: boolean | undefined | null
}

interface ClassArray extends Array<ClassValue> {}

export function cn(...classes: ClassValue[]): string {
  const result: string[] = []

  for (const cls of classes) {
    if (!cls) continue

    const type = typeof cls

    if (type === 'string' || type === 'number') {
      result.push(String(cls))
    } else if (Array.isArray(cls)) {
      if (cls.length) {
        const inner = cn(...cls)
        if (inner) {
          result.push(inner)
        }
      }
    } else if (type === 'object') {
      for (const key in cls as ClassObject) {
        if ((cls as ClassObject)[key]) {
          result.push(key)
        }
      }
    }
  }

  return result.join(' ')
}

/**
 * Alias for cn() - more explicit name
 */
export const classNames = cn

/**
 * Alias for cn() - shorter name
 */
export const clsx = cn

// Default export
export default cn
