import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { LawyerMetricsGrid } from "@/components/lawyer-dashboard/LawyerMetricsGrid"
import { LawyerQuickActions } from "@/components/lawyer-dashboard/LawyerQuickActions"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsMetrics } from "@/components/analytics/AnalyticsMetrics"
import { CaseDistributionChart } from "@/components/analytics/CaseDistributionChart"
import { LawyerPerformanceChart } from "@/components/analytics/LawyerPerformanceChart"
import { RevenueAnalyticsChart } from "@/components/analytics/RevenueAnalyticsChart"
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters"
import { ReportGenerator } from "@/components/analytics/ReportGenerator"

export default function LawyerDashboard() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
        </div>
        
        <LawyerMetricsGrid />

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <LawyerCalendar />
          </div>
          
          <div className="lg:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <LawyerQuickActions />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <AnalyticsFilters />
          <AnalyticsMetrics />
          
          <div className="grid gap-6 md:grid-cols-2">
            <CaseDistributionChart />
            <LawyerPerformanceChart />
          </div>
          
          <RevenueAnalyticsChart />
          
          <ReportGenerator />
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}