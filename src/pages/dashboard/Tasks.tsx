import { DashboardLayout } from "@/layouts/DashboardLayout"
import { TaskList } from "@/components/dashboard/TaskList"

export default function Tasks() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
        </div>
        
        <div className="rounded-lg border bg-card">
          <TaskList />
        </div>
      </div>
    </DashboardLayout>
  )
}