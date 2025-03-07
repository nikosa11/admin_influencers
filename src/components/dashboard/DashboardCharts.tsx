'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import styles from './DashboardCharts.module.css'

const data = [
  { name: 'Jan', users: 8400, revenue: 432000 },
  { name: 'Feb', users: 9100, revenue: 456000 },
  { name: 'Mar', users: 9800, revenue: 478000 },
  { name: 'Apr', users: 10900, revenue: 501000 },
  { name: 'May', users: 11700, revenue: 523400 },
  { name: 'Jun', users: 12500, revenue: 534600 },
  { name: 'Jul', users: 13200, revenue: 567800 },
  { name: 'Aug', users: 14100, revenue: 589200 },
  { name: 'Sep', users: 15000, revenue: 612400 },
  { name: 'Oct', users: 15800, revenue: 634600 },
  { name: 'Nov', users: 16500, revenue: 656800 },
  { name: 'Dec', users: 17200, revenue: 678000 }
]

export function DashboardCharts() {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Monthly Active Users</h3>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#6B7280' }}
                tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                  fontSize: '12px',
                  padding: '8px'
                }}
                labelStyle={{ color: '#9CA3AF', marginBottom: '4px' }}
                itemStyle={{ color: '#E5E7EB', padding: '2px 0' }}
                formatter={(value: number) => [`${(value/1000).toFixed(1)}k`, 'Users']}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#usersGradient)"
                dot={{ fill: '#3B82F6', r: 3 }}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Gross Merchandise Value</h3>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#6B7280' }}
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                  fontSize: '12px',
                  padding: '8px'
                }}
                labelStyle={{ color: '#9CA3AF', marginBottom: '4px' }}
                itemStyle={{ color: '#E5E7EB', padding: '2px 0' }}
                formatter={(value: number) => [`$${(value/1000).toFixed(0)}k`, 'GMV']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                dot={{ fill: '#10B981', r: 3 }}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
