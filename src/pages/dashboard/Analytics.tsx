import { DashboardLayout } from "@/layouts/DashboardLayout"
import { AnalyticsMetrics } from "@/components/analytics/AnalyticsMetrics"
import { CaseDistributionChart } from "@/components/analytics/CaseDistributionChart"
import { LawyerPerformanceChart } from "@/components/analytics/LawyerPerformanceChart"
import { RevenueAnalyticsChart } from "@/components/analytics/RevenueAnalyticsChart"
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters"
import { ReportGenerator } from "@/components/analytics/ReportGenerator"

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        </div>

        <AnalyticsFilters />
        <AnalyticsMetrics />
        
        <div className="grid gap-6 md:grid-cols-2">
          <CaseDistributionChart />
          <LawyerPerformanceChart />
        </div>
        
        <RevenueAnalyticsChart />
        
        <ReportGenerator />
      </div>
    </DashboardLayout>
  )
}