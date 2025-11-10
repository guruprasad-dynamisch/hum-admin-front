import React, { useMemo, useCallback } from 'react'
import { useTable, useSortBy, usePagination, Column, TableInstance, Row, HeaderGroup, ColumnInstance, TableOptions, Cell } from 'react-table'
import { cn } from '@utils/classNames'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import Pagination from './Pagination'
import Loader from './Loader'
import NoData from './NoData'

/**
 * Props for the DataTable component
 * @template T - The type of data objects in the table
 */
interface DataTableProps<T extends object> {
  /** Column definitions for the table */
  columns: Column<T>[]
  /** Array of data objects to display */
  data: T[]
  /** Number of rows per page (default: 10) */
  pageSize?: number
  /** Additional CSS class name */
  className?: string
  /** Callback when a row is clicked */
  onRowClick?: (row: T) => void
  /** Loading state indicator */
  loading?: boolean
  /** Message to display when no data is available */
  emptyMessage?: string
  /** Enable backend/manual pagination mode */
  manualPagination?: boolean
  /** Total number of pages (for manual pagination) */
  pageCount?: number
  /** Current page number (for manual pagination, 1-indexed) */
  currentPage?: number
  /** Callback when page changes (for manual pagination) */
  onPageChange?: (page: number) => void
  /** Total number of items (for manual pagination) */
  totalItems?: number
  /** Enable/disable pagination entirely (default: true) */
  usePagination?: boolean
  /** Show pagination info text (default: true) */
  showPaginationInfo?: boolean
  /** Additional CSS class name for pagination */
  paginationClassName?: string
}

/**
 * A robust, type-safe data table component with sorting and pagination
 * 
 * @template T - The type of data objects in the table
 * @param props - DataTable component props
 * @returns A fully-featured data table with sorting and pagination
 * 
 * @example
 * // Basic usage with client-side pagination
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   pageSize={10}
 * />
 * 
 * @example
 * // With manual pagination and backend data
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   manualPagination
 *   pageCount={totalPages}
 *   currentPage={currentPage}
 *   onPageChange={handlePageChange}
 * />
 * 
 * @example
 * // Without pagination
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   usePagination={false}
 * />
 */
function DataTable<T extends object>({
  columns,
  data,
  pageSize = 10,
  className,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  manualPagination = false,
  pageCount: controlledPageCount,
  currentPage: controlledCurrentPage = 1,
  onPageChange,
  totalItems,
  usePagination: enablePagination = true,
  showPaginationInfo = false,
  paginationClassName
}: DataTableProps<T>) {
  // Extended table instance type with pagination properties
  type ExtendedTableInstance = TableInstance<T> & {
    page: Row<T>[]
    canPreviousPage: boolean
    canNextPage: boolean
    pageOptions: number[]
    pageCount: number
    gotoPage: (updater: number | ((pageIndex: number) => number)) => void
    nextPage: () => void
    previousPage: () => void
    setPageSize: (pageSize: number) => void
    state: { pageIndex: number; pageSize: number }
  }

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: manualPagination ? (controlledCurrentPage - 1) : 0,
        pageSize
      },
      manualPagination,
      ...(manualPagination && controlledPageCount ? { pageCount: controlledPageCount } : {})
    } as TableOptions<T>,
    useSortBy,
    usePagination
  ) as ExtendedTableInstance

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize: currentPageSize }
  } = tableInstance

  /**
   * Handle page change for both manual and automatic pagination
   * @param page - The page number to navigate to (1-indexed)
   */
  const handlePageChange = useCallback((page: number): void => {
    if (manualPagination && onPageChange) {
      onPageChange(page)
    } else {
      gotoPage(page - 1)
    }
  }, [manualPagination, onPageChange, gotoPage])

  /**
   * Handle next page navigation
   */
  const handleNextPage = useCallback((): void => {
    if (manualPagination && onPageChange) {
      onPageChange(controlledCurrentPage + 1)
    } else {
      nextPage()
    }
  }, [manualPagination, onPageChange, controlledCurrentPage, nextPage])

  /**
   * Handle previous page navigation
   */
  const handlePreviousPage = useCallback((): void => {
    if (manualPagination && onPageChange) {
      onPageChange(controlledCurrentPage - 1)
    } else {
      previousPage()
    }
  }, [manualPagination, onPageChange, controlledCurrentPage, previousPage])

  /**
   * Handle goto page (0-indexed)
   */
  const handleGotoPage = useCallback((page: number): void => {
    if (manualPagination && onPageChange) {
      onPageChange(page + 1)
    } else {
      gotoPage(page)
    }
  }, [manualPagination, onPageChange, gotoPage])

  // Calculate display values - memoized to prevent recalculation on every render
  const displayPageIndex = useMemo(() => 
    manualPagination ? (controlledCurrentPage - 1) : pageIndex,
    [manualPagination, controlledCurrentPage, pageIndex]
  )
  const displayPageCount = useMemo(() => 
    manualPagination ? (controlledPageCount || 1) : pageCount,
    [manualPagination, controlledPageCount, pageCount]
  )
  const displayTotalItems = useMemo(() => 
    totalItems || data.length,
    [totalItems, data.length]
  )
  const displayCanNextPage = useMemo(() => 
    manualPagination ? (controlledCurrentPage < (controlledPageCount || 1)) : canNextPage,
    [manualPagination, controlledCurrentPage, controlledPageCount, canNextPage]
  )
  const displayCanPreviousPage = useMemo(() => 
    manualPagination ? (controlledCurrentPage > 1) : canPreviousPage,
    [manualPagination, controlledCurrentPage, canPreviousPage]
  )

  return (
    <div className={cn('data-table-wrapper', className)}>
      <div className="table-container">
        {loading ? (
          <Loader text="Loading data..." />
        ) : data.length === 0 ? (
          <NoData
            title="No Data Available"
            description={emptyMessage}
          />
        ) : (
          <table {...getTableProps()} className="data-table" aria-label={emptyMessage || "Data table"}>
            <caption className="sr-only">{emptyMessage || "Data table results"}</caption>
            <thead>
              {headerGroups.map((headerGroup: HeaderGroup<T>) => {
                const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                return (
                  <tr {...headerGroupProps} key={headerGroupKey ?? headerGroup.id}>
                    {headerGroup.headers.map((column: ColumnInstance<T> & {
                      isSorted?: boolean
                      isSortedDesc?: boolean
                      canSort?: boolean
                      getSortByToggleProps?: () => any
                    }) => {
                      const { key: columnKey, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps?.());
                      return (
                        <th
                          {...columnProps}
                          key={columnKey ?? column.id}
                          className={cn({
                            'sortable': column.canSort,
                            'sorted-asc': column.isSorted && !column.isSortedDesc,
                            'sorted-desc': column.isSorted && column.isSortedDesc
                          })}
                          aria-sort={column.isSorted ? (column.isSortedDesc ? 'descending' : 'ascending') : 'none'}
                        >
                          <div className="th-content">
                            {column.render('Header')}
                            {column.canSort && (
                              <span className="sort-icon">
                                {column.isSorted ? column.isSortedDesc ? <FaSortDown /> : <FaSortUp /> : <FaSort />}
                              </span>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: Row<T>) => {
                prepareRow(row);
                const { key: rowKey, ...rowProps } = row.getRowProps();
                return (
                  <tr
                    {...rowProps}
                    key={rowKey ?? row.id}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn({ 'clickable': !!onRowClick })}
                  >
                    {row.cells.map((cell: Cell<T>) => {
                      const { key: cellKey, ...cellProps } = cell.getCellProps();
                      return (
                        <td {...cellProps} key={cellKey ?? cell.column.id}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && data.length > 0 && enablePagination && (
        <Pagination
          data={data}
          totalRows={displayTotalItems}
          pageIndex={displayPageIndex}
          pageSize={currentPageSize}
          pageCount={displayPageCount}
          gotoPage={handleGotoPage}
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
          canNextPage={displayCanNextPage}
          canPreviousPage={displayCanPreviousPage}
          neighborCount={1}
          showInfo={showPaginationInfo}
          className={paginationClassName}
        />
      )}
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
// Component will only re-render when props change
export default React.memo(DataTable) as typeof DataTable
