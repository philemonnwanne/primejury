import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { LawyerTaskList } from "@/components/lawyer-dashboard/LawyerTaskList"
import { CreateTaskModal } from "@/components/lawyer-dashboard/CreateTaskModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LawyerTasks() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <CreateTaskModal />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <LawyerTaskList />
          </CardContent>
        </Card>
      </div>
    </LawyerDashboardLayout>
  )
}