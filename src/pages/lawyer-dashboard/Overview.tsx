import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { LawyerMetricsGrid } from "@/components/lawyer-dashboard/LawyerMetricsGrid"
import { LawyerQuickActions } from "@/components/lawyer-dashboard/LawyerQuickActions"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// For demo purposes, we're using a hardcoded lawyer ID
// In a real application, this would come from authentication or context
const DEMO_LAWYER_ID = "1"

export default function LawyerDashboard() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
        </div>
        
        <LawyerMetricsGrid />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <LawyerCalendar lawyerId={DEMO_LAWYER_ID} />
          
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