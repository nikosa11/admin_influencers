'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { format, subMonths, eachMonthOfInterval } from 'date-fns'
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri'
import styles from './CustomKPIs.module.css'

// Dynamically import recharts components
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false })
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false })
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false })
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false })

// Generate monthly data for the last 12 months
const generateMonthlyData = () => {
  const today = new Date()
  const months = eachMonthOfInterval({
    start: subMonths(today, 11),
    end: today,
  })

  return months.map((date, index) => {
    const baseValue = 10000 + Math.random() * 5000
    const growth = 1 + (index * 0.1)
    
    return {
      month: format(date, 'MMM yyyy'),
      mau: Math.floor(baseValue * growth),
      gmv: Math.floor(baseValue * growth * 50),
      cac: Math.floor(20 + Math.random() * 10),
      ltv: Math.floor(800 + (index * 50) + (Math.random() * 100)),
      churnRate: 5 - (index * 0.2) + (Math.random() * 2),
      engagement: 65 + (index * 1.5) + (Math.random() * 5),
      activeCampaigns: 12 + Math.floor(index * 0.5),
      agencyRevenue: 35000 + (index * 2500) + (Math.random() * 5000),
    }
  })
}

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

const formatPercent = (value: number) => 
  `${value.toFixed(1)}%`

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US').format(value)

interface KPICardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  children?: React.ReactNode
}

function KPICard({ title, value, change, isPositive, children }: KPICardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.value}>{value}</div>
      <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
        {isPositive ? <RiArrowUpLine /> : <RiArrowDownLine />}
        {change}
      </div>
      {children}
    </div>
  )
}

export function CustomKPIs() {
  const monthlyData = useMemo(() => generateMonthlyData(), [])

  const kpiData = useMemo(() => {
    const lastMonth = monthlyData[monthlyData.length - 1]
    const prevMonth = monthlyData[monthlyData.length - 2]
    
    return [
      {
        title: 'Monthly Active Users (MAU)',
        value: formatNumber(lastMonth.mau),
        change: `${((lastMonth.mau - prevMonth.mau) / prevMonth.mau * 100).toFixed(1)}%`,
        isPositive: lastMonth.mau > prevMonth.mau,
        dataKey: 'mau',
        format: formatNumber,
        color: '#3b82f6',
      },
      {
        title: 'Gross Merchandise Value (GMV)',
        value: formatCurrency(lastMonth.gmv),
        change: `${((lastMonth.gmv - prevMonth.gmv) / prevMonth.gmv * 100).toFixed(1)}%`,
        isPositive: lastMonth.gmv > prevMonth.gmv,
        dataKey: 'gmv',
        format: formatCurrency,
        color: '#10b981',
      },
      {
        title: 'Customer Acquisition Cost (CAC)',
        value: formatCurrency(lastMonth.cac),
        change: `${((prevMonth.cac - lastMonth.cac) / prevMonth.cac * 100).toFixed(1)}%`,
        isPositive: lastMonth.cac < prevMonth.cac,
        dataKey: 'cac',
        format: formatCurrency,
        color: '#f59e0b',
        inverse: true,
      },
      {
        title: 'Lifetime Value (LTV)',
        value: formatCurrency(lastMonth.ltv),
        change: `${((lastMonth.ltv - prevMonth.ltv) / prevMonth.ltv * 100).toFixed(1)}%`,
        isPositive: lastMonth.ltv > prevMonth.ltv,
        dataKey: 'ltv',
        format: formatCurrency,
        color: '#6366f1',
      },
      {
        title: 'Churn Rate',
        value: formatPercent(lastMonth.churnRate),
        change: `${(prevMonth.churnRate - lastMonth.churnRate).toFixed(1)}%`,
        isPositive: lastMonth.churnRate < prevMonth.churnRate,
        dataKey: 'churnRate',
        format: formatPercent,
        color: '#ef4444',
      },
      {
        title: 'Platform Engagement',
        value: formatPercent(lastMonth.engagement),
        change: `${(lastMonth.engagement - prevMonth.engagement).toFixed(1)}%`,
        isPositive: lastMonth.engagement > prevMonth.engagement,
        dataKey: 'engagement',
        format: formatPercent,
        color: '#8b5cf6',
      },
      {
        title: 'Ενεργές Καμπάνιες',
        value: formatNumber(lastMonth.activeCampaigns),
        change: `${((lastMonth.activeCampaigns - prevMonth.activeCampaigns) / prevMonth.activeCampaigns * 100).toFixed(1)}%`,
        isPositive: lastMonth.activeCampaigns > prevMonth.activeCampaigns,
        dataKey: 'activeCampaigns',
        format: formatNumber,
        color: '#3b82f6',
      },
      {
        title: 'Ποσά Agency (Ενεργά)',
        value: formatCurrency(lastMonth.agencyRevenue),
        change: `${((lastMonth.agencyRevenue - prevMonth.agencyRevenue) / prevMonth.agencyRevenue * 100).toFixed(1)}%`,
        isPositive: lastMonth.agencyRevenue > prevMonth.agencyRevenue,
        dataKey: 'agencyRevenue',
        format: formatCurrency,
        color: '#10b981',
      },
    ]
  }, [monthlyData])

  const kpis = [
    {
      title: 'Monthly Active Users (MAU)',
      value: '26,389',
      change: -4.4,
      format: 'number'
    },
    {
      title: 'Gross Merchandise Value (GMV)',
      value: '$1,313,241.00',
      change: 4.4,
      format: 'currency'
    },
    {
      title: 'Customer Acquisition Cost',
      value: '$24.50',
      change: -2.1,
      format: 'currency',
      inverse: true
    },
    {
      title: 'Lifetime Value (LTV)',
      value: '$892.00',
      change: 3.2,
      format: 'currency'
    },
    {
      title: 'Churn Rate',
      value: '4.2%',
      change: -0.6,
      format: 'percent',
      inverse: true
    },
    {
      title: 'Platform Engagement',
      value: '82.6%',
      change: -1.9,
      format: 'percent'
    },
    {
      title: 'Ενεργές Καμπάνιες',
      value: '15',
      change: 2.5,
      format: 'number'
    },
    {
      title: 'Ποσά Agency (Ενεργά)',
      value: '€45,250.00',
      change: 5.8,
      format: 'currency'
    },
    {
      title: 'Top σε Κόστος',
      value: 'Summer Collection',
      change: 8.3,
      format: 'text'
    },
    {
      title: 'Top σε Κέρδος',
      value: 'Holiday Special',
      change: 12.4,
      format: 'text'
    }
  ]

  return (
    <div className={styles.container}>
      {kpis.map((kpi, index) => {
        const isPositive = kpi.inverse ? kpi.change < 0 : kpi.change > 0
        return (
          <div key={index} className={styles.card}>
            <h3 className={styles.title}>{kpi.title}</h3>
            <p className={styles.value}>{kpi.value}</p>
            <p className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? (
                <RiArrowUpLine className={styles.changeIcon} />
              ) : (
                <RiArrowDownLine className={styles.changeIcon} />
              )}
              {Math.abs(kpi.change)}%
            </p>
          </div>
        )
      })}
    </div>
  )
}
