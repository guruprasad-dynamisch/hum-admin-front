import { cn } from '@utils/classNames'

interface BadgeCellProps {
  value: string
  variant?: string
  className?: string
}

export default function BadgeCell({ value, variant, className }: BadgeCellProps) {
  const badgeClass = variant || value

  return (
    <span className={cn('badge', `badge-${badgeClass}`, className)}>
      {value}
    </span>
  )
}
