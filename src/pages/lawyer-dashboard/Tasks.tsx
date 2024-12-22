import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { LawyerTaskList } from "@/components/lawyer-dashboard/LawyerTaskList"
import { CreateTaskModal } from "@/components/lawyer-dashboard/CreateTaskModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskFilters } from "@/components/lawyer-dashboard/TaskFilters"
import { useState } from "react"

export type TaskStatus = "pending" | "completed" | "upcoming"
export type TaskPriority = "high" | "medium" | "low"
export type SortOption = "priority" | "dueDate" | "status"

export default function LawyerTasks() {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | "all">("all")
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | "all">("all")
  const [sortBy, setSortBy] = useState<SortOption>("priority")
  const [selectedCase, setSelectedCase] = useState<string | "all">("all")

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
          <CardContent className="space-y-6">
            <TaskFilters
              status={selectedStatus}
              priority={selectedPriority}
              sortBy={sortBy}
              selectedCase={selectedCase}
              onStatusChange={setSelectedStatus}
              onPriorityChange={setSelectedPriority}
              onSortChange={setSortBy}
              onCaseChange={setSelectedCase}
            />
            <LawyerTaskList
              status={selectedStatus}
              priority={selectedPriority}
              sortBy={sortBy}
              selectedCase={selectedCase}
            />
          </CardContent>
        </Card>
      </div>
    </LawyerDashboardLayout>
  )
}