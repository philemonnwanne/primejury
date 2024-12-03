import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { LawyerMetricsGrid } from "@/components/lawyer-dashboard/LawyerMetricsGrid"
import { LawyerQuickActions } from "@/components/lawyer-dashboard/LawyerQuickActions"
import { LawyerTaskList } from "@/components/lawyer-dashboard/LawyerTaskList"
import { LawyerCaseDistribution } from "@/components/lawyer-dashboard/LawyerCaseDistribution"

export default function LawyerDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Lawyer Dashboard</h1>
        </div>
        
        <LawyerMetricsGrid />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>My Case Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <LawyerCaseDistribution />
            </CardContent>
          </Card>
          
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
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <LawyerTaskList />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Hearings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                No upcoming hearings scheduled.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}