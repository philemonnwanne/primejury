import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { LawyerMetricsGrid } from "@/components/lawyer-dashboard/LawyerMetricsGrid"
import { ClientsLeadsChart } from "@/components/lawyer-dashboard/ClientsLeadsChart"
import { RevenueChart } from "@/components/lawyer-dashboard/RevenueChart"

export default function LawyerDashboard() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
        </div>
        
        <LawyerMetricsGrid />

        <div className="grid gap-6 grid-cols-1 md:grid-cols-12">
          <RevenueChart />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ClientsLeadsChart />
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}