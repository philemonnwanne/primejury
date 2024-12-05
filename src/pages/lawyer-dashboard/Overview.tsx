import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { LawyerMetricsGrid } from "@/components/lawyer-dashboard/LawyerMetricsGrid"
import { LawyerQuickActions } from "@/components/lawyer-dashboard/LawyerQuickActions"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LawyerDashboard() {
  // For now, we'll use a hardcoded lawyerId. In a real app, this would come from auth/context
  const lawyerId = "sarah-parker"

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
        </div>
        
        <LawyerMetricsGrid />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <LawyerCalendar lawyerId={lawyerId} />
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <LawyerQuickActions />
            </CardContent>
          </Card>
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}