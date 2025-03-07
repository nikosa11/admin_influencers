'use client'

import { useState } from 'react'
import { UsersList } from '@/components/users/UsersList'
import { DateRange } from '@/components/users/types'
import { 
  XMarkIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { format, parse } from 'date-fns'
import styles from './page.module.css'
import { dummyUsers } from '@/components/users/dummy-data'
import * as XLSX from 'xlsx'

export default function UsersPage() {
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
  const [selectedTypes, setSelectedTypes] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleDateChange = (type: 'from' | 'to', dateString: string) => {
    const date = parse(dateString, 'yyyy-MM-dd', new Date())
    setDateRange(prev => ({
      ...prev,
      [type]: date
    }))
  }

  const handleReset = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfYear = new Date(2024, 0, 1)
    setDateRange({
      from: startOfYear,
      to: today
    });
    setSelectedTypes('');
    setSearchQuery('');
  }

  const handleApplyFilters = () => {
    // This function would typically update some state or trigger a refetch
    // For now, it's just a placeholder since filtering is done reactively
    console.log('Filters applied:', { dateRange, selectedTypes, searchQuery })
  }

  const exportToExcel = () => {
    const filteredData = dummyUsers.filter((user) => {
      const matchesDate =
        user.createdAt >= dateRange.from && user.createdAt <= dateRange.to;
      const matchesType =
        selectedTypes === '' || user.type === selectedTypes;
      const matchesSearch =
        searchQuery === '' ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDate && matchesType && matchesSearch;
    });

    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((user) => ({
        Name: user.name,
        Email: user.email,
        Type: user.type.charAt(0).toUpperCase() + user.type.slice(1),
        'Created At': format(user.createdAt, 'PP'),
        Earnings: user.earnings,
        Followers: user.followers,
        'Engagement Rate': `${user.engagement}%`,
        'Total Posts': user.totalPosts,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'users.xlsx');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>Users & Influencers</h1>
              <p className={styles.subtitle}>
                Manage and monitor your users and influencers
              </p>
            </div>
          </div>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterGroup}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Date Range:</span>
            <input
              type="date"
              value={format(dateRange.from, 'yyyy-MM-dd')}
              onChange={(e) => handleDateChange('from', e.target.value)}
              className={styles.dateRangePicker}
            />
            <input
              type="date"
              value={format(dateRange.to, 'yyyy-MM-dd')}
              onChange={(e) => handleDateChange('to', e.target.value)}
              className={styles.dateRangePicker}
            />
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Type:</span>
            <select
              value={selectedTypes}
              onChange={(e) => setSelectedTypes(e.target.value)}
              className={styles.typeSelect}
            >
              <option value="">All Types</option>
              <option value="influencer">Influencer</option>
              <option value="user">User</option>
            </select>
          </div>

          <button onClick={handleReset} className={styles.resetButton}>
            <XMarkIcon className={styles.resetIcon} />
            Reset
          </button>
          
          <button onClick={handleApplyFilters} className={styles.filterButton}>
            <FunnelIcon className={styles.filterIcon} />
            Apply Filters
          </button>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.userListHeader}>
            <h2 className={styles.userListTitle}>User List</h2>
            <div className="flex items-center gap-4">
              <span className={styles.userCount}>
                Showing {selectedTypes === '' ? "all" : selectedTypes} users
              </span>
              <button onClick={exportToExcel} className={styles.exportButton}>
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>
          <UsersList
            dateRange={dateRange}
            selectedTypes={selectedTypes === '' ? [] : [selectedTypes]}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  )
}
