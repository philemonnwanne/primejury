import { LawyerMetricsGrid } from "@/components/lawyer-dashboard/LawyerMetricsGrid"
import { LawyerQuickActions } from "@/components/lawyer-dashboard/LawyerQuickActions"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"
import { ActiveCasesSummary } from "@/components/lawyer-dashboard/ActiveCasesSummary"
import { TaskStatus } from "@/components/lawyer-dashboard/TaskStatus"
import { UnreadMessages } from "@/components/lawyer-dashboard/UnreadMessages"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LawyerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
      </div>
      
      <LawyerMetricsGrid />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-12">
        <ActiveCasesSummary />
        <UnreadMessages />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <LawyerCalendar />
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <LawyerQuickActions />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TaskStatus />
      </div>
    </div>
  )
}