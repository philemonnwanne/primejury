import { DashboardLayout } from "@/layouts/DashboardLayout"
import { TaskList } from "@/components/dashboard/TaskList"
import { Calendar } from "@/components/ui/calendar"

export default function Tasks() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Task List</h2>
            <TaskList />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Calendar</h2>
            <div className="rounded-lg border bg-card">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}