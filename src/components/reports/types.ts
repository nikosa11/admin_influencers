export interface DateRange {
  from: Date
  to: Date
}

export interface Report {
  id: string
  title: string
  type: string
  date: Date
  campaign: string
  metrics: {
    impressions: number
    engagement: number
    clicks: number
    conversions: number
    revenue: number
  }
  influencers: {
    id: string
    name: string
    performance: number
    profileImage?: string
  }[]
  platforms: {
    name: string
    color?: string
    metrics: {
      reach: number
      engagement: number
    }
  }[]
}

export const REPORT_TYPES = [
  'Performance',
  'Engagement',
  'Financial',
  'Campaign',
  'Influencer'
] as const

export type ReportType = typeof REPORT_TYPES[number]

export interface ReportStats {
  totalImpressions: number
  totalEngagement: number
  totalRevenue: number
  totalConversions: number
  averagesByType: Record<string, { 
    impressions: number
    engagement: number
    revenue: number 
  }>
  platformPerformance: {
    name: string
    color: string
    reach: number
    engagement: number
    reports: number
  }[]
  influencerPerformance: {
    id: string
    name: string
    profileImage: string
    appearances: number
    averagePerformance: number
    totalPerformance: number
  }[]
  monthlyTrends: {
    month: string
    year: number
    impressions: number
    engagement: number
    revenue: number
    reports: number
  }[]
}
