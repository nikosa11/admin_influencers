'use client'

import { DateRange as DateRangeType, REPORT_TYPES } from './types'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import styles from './ReportsFilters.module.css'
import { useState } from 'react'

interface ReportsFiltersProps {
  dateRange: DateRangeType
  onDateRangeChange: (range: DateRangeType) => void
  selectedTypes: string[]
  onTypesChange: (types: string[]) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ReportsFilters({
  dateRange,
  onDateRangeChange,
  selectedTypes,
  onTypesChange,
  searchQuery,
  onSearchChange,
}: ReportsFiltersProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Format date for display
  const formatDateRange = () => {
    if (!dateRange.from || !dateRange.to) return 'Select date range'
    
    if (dateRange.from.getFullYear() === dateRange.to.getFullYear()) {
      // Same year - don't repeat the year
      const fromStr = format(dateRange.from, 'MMM d')
      const toStr = format(dateRange.to, 'MMM d, yyyy')
      return `${fromStr} - ${toStr}`
    } else {
      // Different years - show both years
      return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`
    }
  }

  // Reset date range to last 30 days
  const resetDateRange = () => {
    const today = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(today.getDate() - 30)
    
    onDateRangeChange({
      from: thirtyDaysAgo,
      to: today
    })
  }

  return (
    <div className={styles.container}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className={styles.header}>
          <FunnelIcon className={styles.headerIcon} />
          <span className={styles.headerText}>Filters</span>
        </div>

        <div className={styles.filtersContainer}>
          {/* Date Range Picker */}
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <button className={styles.dateRangeButton}>
                <CalendarIcon className={styles.dateIcon} />
                <span>{formatDateRange()}</span>
                {isCalendarOpen && (
                  <div className={styles.dateButtonIndicator} />
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className={styles.calendarPopover} align="start">
              <div className={styles.calendarHeader}>
                <h3 className={styles.calendarTitle}>Select Date Range</h3>
                <button 
                  className={styles.resetButton}
                  onClick={resetDateRange}
                  type="button"
                >
                  Last 30 days
                </button>
              </div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    onDateRangeChange(range as DateRangeType)
                    // Close the popover after selection is complete
                    if (range.from && range.to) {
                      setTimeout(() => setIsCalendarOpen(false), 300)
                    }
                  }
                }}
                numberOfMonths={2}
                className={styles.calendar}
              />
              <div className={styles.calendarFooter}>
                <button 
                  className={styles.applyButton}
                  onClick={() => setIsCalendarOpen(false)}
                  type="button"
                >
                  Apply
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Report Type Filter */}
          <div className={styles.typeFilters}>
            {REPORT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => {
                  if (selectedTypes.includes(type)) {
                    onTypesChange(selectedTypes.filter((t) => t !== type))
                  } else {
                    onTypesChange([...selectedTypes, type])
                  }
                }}
                className={`${styles.typeButton} ${
                  selectedTypes.includes(type) ? styles.typeButtonSelected : ''
                }`}
              >
                {type}
                {selectedTypes.includes(type) && (
                  <XMarkIcon className={styles.typeButtonIcon} />
                )}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button 
                className={styles.clearSearchButton}
                onClick={() => onSearchChange('')}
                type="button"
              >
                <XMarkIcon className={styles.clearSearchIcon} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
