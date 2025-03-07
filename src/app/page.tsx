import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'

export default function Home() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      </div>
      
      {/* KPI Metrics */}
      <section className="mb-8">
        <DashboardMetrics />
      </section>
      
      {/* Charts Section */}
      <section>
        <DashboardCharts />
      </section>
    </div>
  )
}
