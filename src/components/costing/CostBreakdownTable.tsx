import { useMemo } from 'react'
import { Column } from 'react-table'
import DataTable from '@components/common/DataTable'
import '@styles/components/cost-breakdown-table.scss'

interface CostItem {
  id: string
  service: string
  icon: string
  cost: number
  usage: string
  percentage: number
}

interface CostBreakdownTableProps {
  items: CostItem[]
}

export default function CostBreakdownTable({ items }: CostBreakdownTableProps) {
  const columns = useMemo<Column<CostItem>[]>(
    () => [
      {
        Header: 'Service',
        accessor: 'service',
        Cell: ({ row }: { row: { original: CostItem } }) => (
          <div className="service-cell">
            <div className="service-icon">{row.original.icon}</div>
            <span>{row.original.service}</span>
          </div>
        )
      },
      {
        Header: 'Cost',
        accessor: 'cost',
        Cell: ({ value }: { value: number }) => (
          <strong className="cost-value">${value.toLocaleString()}</strong>
        )
      },
      {
        Header: 'Usage',
        accessor: 'usage'
      },
      {
        Header: 'Share',
        accessor: 'percentage',
        Cell: ({ value }: { value: number }) => (
          <div className="share-cell">
            <span>{value}%</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        )
      }
    ],
    []
  )

  return (
    <div className="cost-breakdown-table">
      <DataTable
        columns={columns}
        data={items}
        usePagination={false}
      />
    </div>
  )
}
