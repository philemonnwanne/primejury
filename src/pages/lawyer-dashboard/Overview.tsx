import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { LawyerMetricsGrid } from "@/components/lawyer-dashboard/LawyerMetricsGrid"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"
import { ActiveCasesSummary } from "@/components/lawyer-dashboard/ActiveCasesSummary"
import { UnreadMessages } from "@/components/lawyer-dashboard/UnreadMessages"
import { RevenueChart } from "@/components/lawyer-dashboard/RevenueChart"
import { PerformanceMetrics } from "@/components/lawyer-dashboard/PerformanceMetrics"
import { NewsSection } from "@/components/lawyer-dashboard/NewsSection"
import { ClientsLeadsChart } from "@/components/lawyer-dashboard/ClientsLeadsChart"
import { PendingConsultations } from "@/components/lawyer-dashboard/PendingConsultations"
import { LimitationStatus } from "@/components/lawyer-dashboard/LimitationStatus"
import { BillingInfo } from "@/components/lawyer-dashboard/BillingInfo"

export default function LawyerDashboard() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        </div>
        
        {/* Metrics Grid - Top row */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <LawyerMetricsGrid />
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Revenue Chart - Spans full width on mobile, half on desktop */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-lg p-4">
              <RevenueChart />
            </div>
          </div>

          {/* Two Column Layout for Charts */}
          <div className="glass-effect rounded-lg p-4">
            <PerformanceMetrics />
          </div>
          <div className="glass-effect rounded-lg p-4">
            <ClientsLeadsChart />
          </div>

          {/* Calendar and Messages Section */}
          <div className="glass-effect rounded-lg p-4">
            <LawyerCalendar />
          </div>
          <div className="glass-effect rounded-lg p-4">
            <UnreadMessages />
          </div>

          {/* Cases and Consultations */}
          <div className="glass-effect rounded-lg p-4">
            <ActiveCasesSummary />
          </div>
          <div className="glass-effect rounded-lg p-4">
            <PendingConsultations />
          </div>

          {/* Billing and News */}
          <div className="glass-effect rounded-lg p-4">
            <BillingInfo />
          </div>
          <div className="glass-effect rounded-lg p-4">
            <NewsSection />
          </div>

          {/* Full Width Components */}
          <div className="lg:col-span-2 glass-effect rounded-lg p-4">
            <LimitationStatus />
          </div>
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}