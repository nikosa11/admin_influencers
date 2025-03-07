import { Report, REPORT_TYPES } from './types'
import { subDays } from 'date-fns'

// Use a fixed base date to avoid hydration errors
const BASE_DATE = new Date('2024-01-01')

// Σταθερά δεδομένα για πλατφόρμες
const PLATFORMS = [
  { name: 'Instagram', baseReach: 500000, baseEngagement: 50000 },
  { name: 'TikTok', baseReach: 800000, baseEngagement: 80000 },
  { name: 'YouTube', baseReach: 300000, baseEngagement: 30000 },
  { name: 'Facebook', baseReach: 400000, baseEngagement: 40000 },
  { name: 'Twitter', baseReach: 200000, baseEngagement: 20000 },
  { name: 'LinkedIn', baseReach: 100000, baseEngagement: 10000 }
]

// Σταθερά δεδομένα για τις καμπάνιες
const CAMPAIGNS = [
  'Summer Collection',
  'Winter Sale',
  'Spring Launch',
  'Holiday Special',
  'Back to School'
]

// Σταθερά δεδομένα για influencers
const INFLUENCERS = [
  { id: 'inf-1', name: 'Maria Papadopoulou', performance: 95 },
  { id: 'inf-2', name: 'Giorgos Andreou', performance: 88 },
  { id: 'inf-3', name: 'Eleni Dimitriou', performance: 92 },
  { id: 'inf-4', name: 'Nikos Georgiou', performance: 85 },
  { id: 'inf-5', name: 'Sofia Alexiou', performance: 90 }
]

// Προκαθορισμένα δεδομένα για τις αναφορές
const generateDummyReport = (id: number, type: string): Report => {
  // Κάθε τύπος θα έχει 10 αναφορές (50 συνολικά / 5 τύποι)
  const reportNumber = Math.floor(id / REPORT_TYPES.length) + 1
  const daysAgo = id * 3 // Μια αναφορά κάθε 3 μέρες
  const date = subDays(BASE_DATE, daysAgo)
  
  // Επιλογή καμπάνιας με βάση το id
  const campaignIndex = id % CAMPAIGNS.length
  const campaign = CAMPAIGNS[campaignIndex]
  
  // Σταθερές τιμές μετρικών με μικρή διαφοροποίηση ανά τύπο αναφοράς
  let impressions = 250000
  let engagement = 25000
  let clicks = 10000
  let conversions = 1000
  let revenue = 25000
  
  // Διαφοροποίηση με βάση τον τύπο αναφοράς
  switch (type) {
    case 'Performance':
      impressions += 50000
      clicks += 5000
      break
    case 'Engagement':
      engagement += 15000
      break
    case 'Financial':
      revenue += 15000
      conversions += 500
      break
    case 'Campaign':
      impressions += 30000
      engagement += 8000
      break
    case 'Influencer':
      engagement += 10000
      clicks += 2000
      break
  }
  
  // Επιλογή 3 influencers για κάθε αναφορά
  const selectedInfluencers = INFLUENCERS.slice(0, 3).map(influencer => ({
    id: influencer.id,
    name: influencer.name,
    performance: influencer.performance
  }))
  
  // Επιλογή 3 πλατφορμών για κάθε αναφορά
  const selectedPlatforms = PLATFORMS.slice(0, 3).map(platform => ({
    name: platform.name,
    metrics: {
      reach: platform.baseReach,
      engagement: platform.baseEngagement
    }
  }))
  
  return {
    id: `report-${id}`,
    title: `${campaign} - ${type} Report #${reportNumber}`,
    type,
    date,
    campaign,
    metrics: {
      impressions,
      engagement,
      clicks,
      conversions,
      revenue,
    },
    influencers: selectedInfluencers,
    platforms: selectedPlatforms,
  }
}

// Δημιουργία 50 αναφορών με ίση κατανομή όλων των τύπων
export const dummyReports: Report[] = Array.from({ length: 50 }, (_, i) => {
  // Εξασφάλιση ίσης κατανομής τύπων (10 αναφορές ανά τύπο)
  const typeIndex = i % REPORT_TYPES.length
  return generateDummyReport(i, REPORT_TYPES[typeIndex])
})
