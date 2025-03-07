'use client'

import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, LabelList
} from 'recharts'
import { format, subMonths } from 'date-fns'
import styles from './CampaignPerformanceChart.module.css'

// Generate campaign performance data
const generateCampaignData = () => {
  const campaigns = [
    { name: 'Summer Collection', cost: 12500, profit: 18750, roi: 1.5 },
    { name: 'Holiday Special', cost: 9800, profit: 22400, roi: 2.29 },
    { name: 'Spring Launch', cost: 8500, profit: 14200, roi: 1.67 },
    { name: 'Back to School', cost: 7200, profit: 11800, roi: 1.64 },
    { name: 'Winter Sale', cost: 6500, profit: 9800, roi: 1.51 }
  ]
  
  return campaigns
}

// Generate agency data
const generateAgencyData = () => {
  const today = new Date()
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(today, 5 - i)
    return {
      month: format(date, 'MMM yyyy'),
      activeCampaigns: 10 + Math.floor(i * 0.8) + Math.floor(Math.random() * 3),
      agencyRevenue: 35000 + (i * 2500) + (Math.random() * 1000),
      costPerCampaign: 5000 + Math.floor(i * 200) + Math.floor(Math.random() * 500)
    }
  })
  
  return months
}

// Generate top influencers data
const generateTopInfluencersData = () => {
  return [
    { name: 'Μαρία Παπαδοπούλου', followers: 1250000, engagement: 3.8, cost: 8500, campaigns: 5 },
    { name: 'Γιώργος Αντωνίου', followers: 980000, engagement: 4.2, cost: 7200, campaigns: 4 },
    { name: 'Ελένη Κωνσταντίνου', followers: 1450000, engagement: 3.5, cost: 9200, campaigns: 6 },
    { name: 'Δημήτρης Νικολάου', followers: 850000, engagement: 4.5, cost: 6800, campaigns: 3 },
    { name: 'Σοφία Αλεξίου', followers: 1120000, engagement: 3.9, cost: 7800, campaigns: 5 }
  ]
}

// Generate platform distribution data
const generatePlatformData = () => {
  return [
    { name: 'Instagram', value: 45, color: '#E1306C' },
    { name: 'TikTok', value: 25, color: '#000000' },
    { name: 'YouTube', value: 15, color: '#FF0000' },
    { name: 'Facebook', value: 10, color: '#4267B2' },
    { name: 'Twitter', value: 5, color: '#1DA1F2' }
  ]
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e']

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(value)

const formatNumber = (value: number) =>
  new Intl.NumberFormat('el-GR').format(value)

const formatPercent = (value: number) =>
  `${value.toFixed(1)}%`

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.tooltipLabel}>{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.dataKey.includes('cost') || entry.dataKey.includes('profit') || entry.dataKey.includes('Revenue') ? 
              formatCurrency(entry.value) : 
              entry.dataKey.includes('engagement') ? 
                formatPercent(entry.value) : 
                formatNumber(entry.value)}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

export function CampaignPerformanceChart() {
  const campaignData = useMemo(() => generateCampaignData(), [])
  const agencyData = useMemo(() => generateAgencyData(), [])
  const topInfluencersData = useMemo(() => generateTopInfluencersData(), [])
  const platformData = useMemo(() => generatePlatformData(), [])
  
  const pieData = useMemo(() => {
    return campaignData.slice(0, 5).map(campaign => ({
      name: campaign.name,
      value: campaign.profit
    }))
  }, [campaignData])

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Καμπάνιες - Κόστος και Κέρδος</h3>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={campaignData}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis tickFormatter={(value) => `${value / 1000}K €`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="cost" name="Κόστος" fill="#ef4444">
                <LabelList dataKey="cost" position="top" formatter={(value: number) => `${value / 1000}K €`} />
              </Bar>
              <Bar dataKey="profit" name="Κέρδος" fill="#10b981">
                <LabelList dataKey="profit" position="top" formatter={(value: number) => `${value / 1000}K €`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Ενεργές Καμπάνιες ανά Μήνα</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={agencyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="activeCampaigns" 
                  name="Ενεργές Καμπάνιες" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  label={{ 
                    position: 'top', 
                    formatter: (value: number) => value,
                    fontSize: 12,
                    fill: '#666'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Ποσά Agency ανά Μήνα</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={agencyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value / 1000}K €`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="agencyRevenue" 
                  name="Ποσά Agency" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  label={{ 
                    position: 'top', 
                    formatter: (value: number) => `${Math.round(value / 1000)}K €`,
                    fontSize: 12,
                    fill: '#666'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="costPerCampaign" 
                  name="Κόστος ανά Καμπάνια" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  label={{ 
                    position: 'top', 
                    formatter: (value: number) => `${Math.round(value / 1000)}K €`,
                    fontSize: 12,
                    fill: '#666'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Κατανομή Κέρδους ανά Καμπάνια</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={(entry) => `${entry.name}: ${Math.round(entry.percent * 100)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend formatter={(value, entry) => `${value}: ${formatCurrency(entry.payload.value)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Κατανομή ανά Πλατφόρμα</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend formatter={(value, entry) => `${value}: ${entry.payload.value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Top Influencers</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Όνομα</th>
                <th>Followers</th>
                <th>Engagement</th>
                <th>Κόστος</th>
                <th>Καμπάνιες</th>
              </tr>
            </thead>
            <tbody>
              {topInfluencersData.map((influencer, index) => (
                <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  <td>{influencer.name}</td>
                  <td>{formatNumber(influencer.followers)}</td>
                  <td>{influencer.engagement}%</td>
                  <td>{formatCurrency(influencer.cost)}</td>
                  <td>{influencer.campaigns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
