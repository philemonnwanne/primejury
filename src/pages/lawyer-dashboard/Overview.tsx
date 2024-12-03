import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { LawyerMetricsGrid } from "@/components/lawyer-dashboard/LawyerMetricsGrid"
import { LawyerQuickActions } from "@/components/lawyer-dashboard/LawyerQuickActions"
import { LawyerTaskList } from "@/components/lawyer-dashboard/LawyerTaskList"
import { LawyerCaseDistribution } from "@/components/lawyer-dashboard/LawyerCaseDistribution"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"

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
          
          <div className="col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <LawyerQuickActions />
              </CardContent>
            </Card>
            
            <LawyerCalendar />
          </div>
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
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Document uploaded", case: "Smith vs. Johnson", time: "2 hours ago" },
                  { action: "Meeting scheduled", case: "Tech Corp Merger", time: "4 hours ago" },
                  { action: "Task completed", case: "Estate Planning - Brown", time: "1 day ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.case}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}