import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { LawyerMetricsGrid } from "@/components/lawyer-dashboard/LawyerMetricsGrid"
import { LawyerQuickActions } from "@/components/lawyer-dashboard/LawyerQuickActions"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"
import { ActiveCasesSummary } from "@/components/lawyer-dashboard/ActiveCasesSummary"
import { TaskStatus } from "@/components/lawyer-dashboard/TaskStatus"
import { UnreadMessages } from "@/components/lawyer-dashboard/UnreadMessages"
import { RevenueChart } from "@/components/lawyer-dashboard/RevenueChart"
import { PerformanceMetrics } from "@/components/lawyer-dashboard/PerformanceMetrics"
import { NewsSection } from "@/components/lawyer-dashboard/NewsSection"
import { ClientsLeadsChart } from "@/components/lawyer-dashboard/ClientsLeadsChart"
import { PendingConsultations } from "@/components/lawyer-dashboard/PendingConsultations"
import { LimitationStatus } from "@/components/lawyer-dashboard/LimitationStatus"
import { BillingInfo } from "@/components/lawyer-dashboard/BillingInfo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LawyerDashboard() {
  return (
    <LawyerDashboardLayout>
      <div className="container mx-auto space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
        </div>
        
        <LawyerMetricsGrid />

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <ActiveCasesSummary />
          <UnreadMessages />
        </div>

        <div className="grid gap-6 grid-cols-1">
          <RevenueChart />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <PerformanceMetrics />
          <NewsSection />
        </div>

        <div className="grid gap-6 grid-cols-1">
          <ClientsLeadsChart />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <PendingConsultations />
          <BillingInfo />
        </div>

        <div className="grid gap-6 grid-cols-1">
          <LimitationStatus />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <LawyerCalendar />
          </div>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <LawyerQuickActions />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1">
          <TaskStatus />
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}