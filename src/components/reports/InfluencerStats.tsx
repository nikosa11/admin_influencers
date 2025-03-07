'use client'

import styles from './InfluencerStats.module.css'

interface Influencer {
  name: string
  averagePerformance: string
  totalAppearances: number
  reachRate: string
  engagementRate: string
}

const influencers: Influencer[] = [
  {
    name: 'AI Influencer 1',
    averagePerformance: '48.74%',
    totalAppearances: 124,
    reachRate: '76%',
    engagementRate: '12.4%'
  },
  {
    name: 'AI Influencer 2',
    averagePerformance: '51.30%',
    totalAppearances: 156,
    reachRate: '82%',
    engagementRate: '14.2%'
  },
  {
    name: 'AI Influencer 3',
    averagePerformance: '54.46%',
    totalAppearances: 142,
    reachRate: '79%',
    engagementRate: '13.8%'
  },
  {
    name: 'AI Influencer 4',
    averagePerformance: '52.85%',
    totalAppearances: 138,
    reachRate: '81%',
    engagementRate: '13.5%'
  }
]

export function InfluencerStats() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Performing Influencers</h2>
      </div>
      <div className={styles.grid}>
        {influencers.map((influencer) => (
          <div key={influencer.name} className={styles.card}>
            <h3 className={styles.influencerName}>{influencer.name}</h3>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Average Performance</span>
                <span className={styles.statValue}>
                  <span className={styles.performance}>{influencer.averagePerformance}</span>
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Total Appearances</span>
                <span className={styles.statValue}>{influencer.totalAppearances}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Reach Rate</span>
                <span className={styles.statValue}>{influencer.reachRate}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Engagement Rate</span>
                <span className={styles.statValue}>{influencer.engagementRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
