import { Breadcrumb as BSBreadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '@styles/components/breadcrumb.scss'

export interface BreadcrumbItem {
  label: string
  path?: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <BSBreadcrumb className={`custom-breadcrumb ${className}`}>
      {items.map((item, index) => (
        <BSBreadcrumb.Item
          key={index}
          active={item.active || index === items.length - 1}
          linkAs={item.path ? Link : 'span'}
          linkProps={item.path ? { to: item.path } : {}}
        >
          {item.label}
        </BSBreadcrumb.Item>
      ))}
    </BSBreadcrumb>
  )
}
