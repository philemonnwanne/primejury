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
      <div className="space-y-6 animate-fade-in max-w-[1920px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <LawyerMetricsGrid />
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <div className="glass-effect rounded-lg p-4">
            <RevenueChart />
          </div>
          <div className="glass-effect rounded-lg p-4">
            <ClientsLeadsChart />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <div className="glass-effect rounded-lg p-4">
            <BillingInfo />
          </div>
          <div className="glass-effect rounded-lg p-4">
            <LawyerCalendar />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
          <div className="glass-effect rounded-lg p-4 xl:col-span-1">
            <PendingConsultations />
          </div>
          <div className="glass-effect rounded-lg p-4 xl:col-span-2">
            <NewsSection />
          </div>
        </div>
        
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <div className="glass-effect rounded-lg p-4">
            <LimitationStatus />
          </div>
           <div className="glass-effect rounded-lg p-4">
            <PerformanceMetrics />
          </div>
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}
