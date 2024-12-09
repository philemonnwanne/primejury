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
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <LawyerMetricsGrid />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="glass-effect rounded-lg p-4">
            <ActiveCasesSummary />
          </div>
          <div className="glass-effect rounded-lg p-4">
            <UnreadMessages />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1">
          <div className="glass-effect rounded-lg p-4 max-w-full">
            <RevenueChart />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="glass-effect rounded-lg p-4">
            <PerformanceMetrics />
          </div>
          <div className="glass-effect rounded-lg p-4">
            <NewsSection />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1">
          <div className="glass-effect rounded-lg p-4 max-w-full">
            <ClientsLeadsChart />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="glass-effect rounded-lg p-4">
            <PendingConsultations />
          </div>
          <div className="glass-effect rounded-lg p-4">
            <BillingInfo />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1">
          <div className="glass-effect rounded-lg p-4">
            <LimitationStatus />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="glass-effect rounded-lg p-4">
            <LawyerCalendar />
          </div>
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <LawyerQuickActions />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1">
          <div className="glass-effect rounded-lg p-4">
            <TaskStatus />
          </div>
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}