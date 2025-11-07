import React from 'react'
import { SecondaryBtn } from '@components/buttons'
import { cn } from '@utils/classNames'
import '@styles/components/data-table.scss'

interface PaginationProps {
  data?: any[]
  totalRows?: number
  pageIndex: number
  pageSize: number
  pageCount: number
  gotoPage: (page: number) => void
  nextPage: () => void
  previousPage: () => void
  canNextPage: boolean
  canPreviousPage: boolean
  neighborCount?: number
  showInfo?: boolean
  className?: string
}

const Pagination: React.FC<PaginationProps> = ({
  data = [],
  totalRows,
  pageIndex,
  pageSize,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  neighborCount = 1,
  showInfo = true,
  className
}) => {
  const totalRecords = totalRows ?? data.length
  const start = totalRecords === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, totalRecords)
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i)

  const renderPaginationButtons = () => {
    const visiblePages = new Set<number>([
      0,
      pageCount - 1,
      pageIndex
    ])

    for (let i = 1; i <= neighborCount; i++) {
      if (pageIndex - i >= 0) visiblePages.add(pageIndex - i)
      if (pageIndex + i < pageCount) visiblePages.add(pageIndex + i)
    }

    return pageNumbers.map((number) => {
      if (visiblePages.has(number)) {
        return (
          <button
            key={number}
            onClick={() => {
              gotoPage(number)
            }}
            className={cn("pagination-btn", { active: number === pageIndex })}
          >
            {number + 1}
          </button>
        )
      }
      if (
        visiblePages.has(number - 1) &&
        !visiblePages.has(number) &&
        !visiblePages.has(number + 1)
      ) {
        return <span key={number} className="pagination-ellipsis">...</span>
      }
      return null
    })
  }

  return (
    <div className={cn('table-footer', className)}>
      {showInfo && (
        <div className="table-info">
          Showing {start} to {end} of {totalRecords} entries
        </div>
      )}
      <div className="pagination-numbers">
        <SecondaryBtn 
          onClick={() => {
            previousPage()
          }} 
          className='pagination-btn' 
          disabled={!canPreviousPage} 
          fullWidth={false}
        >
          ←
        </SecondaryBtn>
        {renderPaginationButtons()}
        <SecondaryBtn 
          onClick={() => {
            nextPage()
          }} 
          className='pagination-btn' 
          disabled={!canNextPage} 
          fullWidth={false}
        >
          →
        </SecondaryBtn>
      </div>
    </div>
  )
}

export default Pagination
