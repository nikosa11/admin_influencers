'use client'

import { useMemo } from 'react'
import { Report } from './types'
import { dummyReports } from './dummy-data'
import { CustomKPIs } from './CustomKPIs'
import { InfluencerStats } from './InfluencerStats'
import { CampaignPerformanceChart } from './CampaignPerformanceChart'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface ReportStatsProps {
  dateRange: { from: Date; to: Date }
  selectedTypes: string[]
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6']

export function ReportStats({ dateRange, selectedTypes }: ReportStatsProps) {
  const filteredReports = useMemo(() => {
    return dummyReports.filter(
      (report) =>
        report.date >= dateRange.from &&
        report.date <= dateRange.to &&
        (selectedTypes.length === 0 || selectedTypes.includes(report.type))
    )
  }, [dateRange, selectedTypes])

  const platformStats = useMemo(() => {
    const stats = filteredReports.reduce((acc, report) => {
      report.platforms.forEach((platform) => {
        if (!acc[platform.name]) {
          acc[platform.name] = {
            reach: 0,
            engagement: 0,
          }
        }
        acc[platform.name].reach += platform.metrics.reach
        acc[platform.name].engagement += platform.metrics.engagement
      })
      return acc
    }, {} as Record<string, { reach: number; engagement: number }>)

    return Object.entries(stats).map(([name, metrics]) => ({
      name,
      ...metrics,
    }))
  }, [filteredReports])

  const typeDistribution = useMemo(() => {
    const distribution = filteredReports.reduce((acc, report) => {
      acc[report.type] = (acc[report.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }))
  }, [filteredReports])

  const topInfluencers = useMemo(() => {
    const influencers = filteredReports
      .flatMap((report) => report.influencers)
      .reduce((acc, influencer) => {
        if (!acc[influencer.id]) {
          acc[influencer.id] = {
            name: influencer.name,
            performance: 0,
            appearances: 0,
          }
        }
        acc[influencer.id].performance += influencer.performance
        acc[influencer.id].appearances += 1
        return acc
      }, {} as Record<string, { name: string; performance: number; appearances: number }>)

    return Object.values(influencers)
      .map((inf) => ({
        ...inf,
        avgPerformance: inf.performance / inf.appearances,
      }))
      .sort((a, b) => b.avgPerformance - a.avgPerformance)
      .slice(0, 5)
  }, [filteredReports])

  return (
    <div className="space-y-8">
      {/* Key Performance Indicators */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Key Performance Indicators</h2>
        <CustomKPIs />
        <InfluencerStats />
      </section>

      {/* Campaign Performance Charts */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Στατιστικά Καμπανιών & Agency</h2>
        <CampaignPerformanceChart />
      </section>
    </div>
  )
}
