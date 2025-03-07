'use client'

import { useState } from 'react'
import { ReportsList } from '@/components/reports/ReportsList'
import { ReportsFilters } from '@/components/reports/ReportsFilters'
import { ReportStats } from '@/components/reports/ReportStats'
import { DateRange } from '@/components/reports/types'
import styles from './page.module.css'

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const now = new Date()
    // Set time to start of day to avoid time-based hydration mismatches
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfYear = new Date(2024, 0, 1)
    return {
      from: startOfYear,
      to: today
    }
  })
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'list' | 'analytics'>('list')

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              Analytics Reports
            </h1>
            <div className={styles.tabButtons}>
              <button
                onClick={() => setActiveTab('list')}
                className={`${styles.tabButton} ${
                  activeTab === 'list'
                    ? styles.tabButtonActive
                    : styles.tabButtonInactive
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`${styles.tabButton} ${
                  activeTab === 'analytics'
                    ? styles.tabButtonActive
                    : styles.tabButtonInactive
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'list' ? (
          <>
            <div className={styles.filtersContainer}>
              <ReportsFilters
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                selectedTypes={selectedTypes}
                onTypesChange={setSelectedTypes}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            <div className={styles.mainContent}>
              <div className={styles.contentPanel}>
                <ReportsList
                  dateRange={dateRange}
                  selectedTypes={selectedTypes}
                  searchQuery={searchQuery}
                />
              </div>
            </div>
          </>
        ) : (
          <div className={styles.mainContent}>
            <ReportStats
              dateRange={dateRange}
              selectedTypes={selectedTypes}
            />
          </div>
        )}
      </div>
    </div>
  )
}
