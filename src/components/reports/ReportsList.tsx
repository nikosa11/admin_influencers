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
import { DateRange, Report } from './types'
import { dummyReports } from './dummy-data'
import * as XLSX from 'xlsx'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import styles from './ReportsList.module.css'

interface ReportsListProps {
  dateRange: DateRange
  selectedTypes: string[]
  searchQuery: string
}

const columnHelper = createColumnHelper<Report>()

const columns = [
  columnHelper.accessor('title', {
    header: 'Report Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => format(info.getValue(), 'PP'),
  }),
  columnHelper.accessor('metrics.impressions', {
    header: 'Impressions',
    cell: (info) => info.getValue().toLocaleString('en-US'),
  }),
  columnHelper.accessor('metrics.engagement', {
    header: 'Engagement',
    cell: (info) => info.getValue().toLocaleString('en-US'),
  }),
  columnHelper.accessor('metrics.revenue', {
    header: 'Revenue',
    cell: (info) => `$${info.getValue().toLocaleString('en-US')}`,
  }),
]

export function ReportsList({
  dateRange,
  selectedTypes,
  searchQuery,
}: ReportsListProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const filteredData = useMemo(() => {
    return dummyReports.filter((report) => {
      const matchesDate =
        report.date >= dateRange.from && report.date <= dateRange.to
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(report.type)
      const matchesSearch =
        searchQuery === '' ||
        report.title.toLowerCase().includes(searchQuery.toLowerCase())

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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((report) => ({
        Title: report.title,
        Type: report.type,
        Date: format(report.date, 'PP'),
        Impressions: report.metrics.impressions,
        Engagement: report.metrics.engagement,
        Revenue: report.metrics.revenue,
      }))
    )
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Reports')
    XLSX.writeFile(wb, 'reports.xlsx')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={exportToExcel}
          className={styles.exportButton}
        >
          Export to Excel
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
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
                        <ArrowUpIcon />
                      ) : header.column.getIsSorted() === 'desc' ? (
                        <ArrowDownIcon />
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.tr}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
