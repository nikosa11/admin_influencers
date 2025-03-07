'use client'

import { Card } from '@/components/ui/card'
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  UserPlusIcon,
  ChartBarIcon,
  ArrowTrendingDownIcon,
  HandRaisedIcon 
} from '@heroicons/react/24/outline'
import styles from './DashboardMetrics.module.css'

const metrics = [
  {
    name: 'Monthly Active Users',
    value: '12.5K',
    change: '+12.3%',
    icon: UsersIcon,
  },
  {
    name: 'Gross Merchandise Value',
    value: '$534.6K',
    change: '+8.2%',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Customer Acquisition Cost',
    value: '$24.3',
    change: '-2.1%',
    icon: UserPlusIcon,
  },
  {
    name: 'Lifetime Value',
    value: '$850',
    change: '+5.4%',
    icon: ChartBarIcon,
  },
  {
    name: 'Churn Rate',
    value: '2.4%',
    change: '-0.8%',
    icon: ArrowTrendingDownIcon,
  },
  {
    name: 'Platform Engagement',
    value: '78%',
    change: '+3.2%',
    icon: HandRaisedIcon,
  },
]

export function DashboardMetrics() {
  return (
    <div className={styles.metricsGrid}>
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isNegative = metric.change.startsWith('-')
        return (
          <Card key={metric.name} className={styles.metricCard}>
            <div className={styles.metricContent}>
              <div className={styles.iconWrapper}>
                <Icon className={styles.icon} />
              </div>
              <div className={styles.metricInfo}>
                <p className={styles.metricName}>{metric.name}</p>
                <div className={styles.metricValue}>
                  {metric.value}
                  <span className={`${styles.metricChange} ${isNegative ? styles.negative : styles.positive}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
