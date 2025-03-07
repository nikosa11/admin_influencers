'use client'

import { useState, useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { DateRange, User } from './types'
import { dummyUsers } from './dummy-data'
import * as XLSX from 'xlsx'
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline'
import { formatCurrency } from '@/lib/utils'
import styles from './UsersList.module.css'

interface UsersListProps {
  dateRange: DateRange
  selectedTypes: string[]
  searchQuery: string
}

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <span className="font-medium">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => (
      <span className={`${styles.badge} ${info.getValue() === 'influencer' ? styles.badgeDefault : styles.badgeSecondary}`}>
        {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
      </span>
    ),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => format(info.getValue(), 'PP'),
  }),
  columnHelper.accessor('earnings', {
    header: 'Earnings',
    cell: (info) => (
      <span className={info.getValue() > 0 ? "text-green-600 dark:text-green-400 font-medium" : ""}>
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor('followers', {
    header: 'Followers',
    cell: (info) => (
      <span className={info.getValue() > 0 ? "font-medium" : ""}>
        {info.getValue().toLocaleString('en-US')}
      </span>
    ),
  }),
  columnHelper.accessor('engagement', {
    header: 'Engagement Rate',
    cell: (info) => (
      <span className={info.getValue() > 0 ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
        {info.getValue()}%
      </span>
    ),
  }),
  columnHelper.accessor('totalPosts', {
    header: 'Total Posts',
    cell: (info) => (
      <span className={info.getValue() > 0 ? "font-medium" : ""}>
        {info.getValue().toLocaleString('en-US')}
      </span>
    ),
  }),
]

export function UsersList({
  dateRange,
  selectedTypes,
  searchQuery,
}: UsersListProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const filteredData = useMemo(() => {
    return dummyUsers.filter((user) => {
      const matchesDate =
        user.createdAt >= dateRange.from && user.createdAt <= dateRange.to
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(user.type)
      const matchesSearch =
        searchQuery === '' ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesDate && matchesType && matchesSearch
    })
  }, [dateRange, selectedTypes, searchQuery])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={styles.th}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className={styles.sortIcon}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === 'asc' ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : header.column.getIsSorted() === 'desc' ? (
                        <ArrowDownIcon className="h-4 w-4" />
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={styles.tr}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.emptyState}>
                  No users found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredData.length > 0 && (
        <div className={styles.tablePagination}>
          <div className={styles.paginationInfo}>
            Showing <span className={styles.paginationHighlight}>{filteredData.length}</span> of <span className={styles.paginationHighlight}>{dummyUsers.length}</span> users
          </div>
        </div>
      )}
    </div>
  )
}
