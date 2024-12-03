import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { PerformanceMetrics } from "@/components/performance/PerformanceMetrics"
import { ActivitySummary } from "@/components/performance/ActivitySummary"
import { PerformanceTrends } from "@/components/performance/PerformanceTrends"
import { CaseResolutionChart } from "@/components/performance/CaseResolutionChart"

export default function LawyerPerformance() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Performance Dashboard</h1>
        <PerformanceMetrics />
        <div className="grid gap-6 md:grid-cols-2">
          <PerformanceTrends />
          <CaseResolutionChart />
        </div>
        <ActivitySummary />
      </div>
    </LawyerDashboardLayout>
  )
}