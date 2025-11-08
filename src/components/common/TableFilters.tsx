import { cn } from '@utils/classNames'
import InputField from '@components/fields/InputField'
import SelectField from '@components/fields/SelectField'
import '@styles/components/table-filters.scss'

export interface FilterOption {
  value: string
  label: string
}

export interface FilterConfig {
  id: string
  label?: string
  placeholder?: string
  type: 'search' | 'select'
  options?: FilterOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

interface TableFiltersProps {
  filters: FilterConfig[]
  className?: string
}

export default function TableFilters({ filters, className }: TableFiltersProps) {
  return (
    <div className={cn('table-filters', className)}>
      {filters.map((filter) => {
        if (filter.type === 'search') {
          return (
            <div key={filter.id} className="filter-item filter-search">
              <InputField
                name={filter.id}
                type="search"
                placeholder={filter.placeholder || 'Search...'}
                value={filter.value}
                onChange={(value: string | number) => filter.onChange(value as string)}
                showLabel={false}
                icon="🔍"
                iconPosition="start"
                className="filter-search-input"
              />
            </div>
          )
        }

        if (filter.type === 'select') {
          return (
            <div key={filter.id} className="filter-item filter-select">
              <SelectField
                name={filter.id}
                label={filter.label}
                value={filter.value}
                onChange={(value: string) => filter.onChange(value)}
                options={filter.options || []}
                showLabel={!!filter.label}
                className={cn('filter-select-field', filter.className)}
              />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
