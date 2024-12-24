import { useState } from "react"
import { CheckSquare, AlertCircle, Clock, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockTasks } from "./mock-data"
import { Task } from "./types"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { TaskDetails } from "./TaskDetails"

export function TaskList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCase, setSelectedCase] = useState<string>("all")
  const [selectedAssignee, setSelectedAssignee] = useState<number | "all">("all")
  const [selectedPriority, setSelectedPriority] = useState<Task["priority"] | "all">("all")
  const [selectedStatus, setSelectedStatus] = useState<Task["status"] | "all">("all")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // Get unique cases and assignees for filters
  const cases = Array.from(new Set(mockTasks.map(task => task.case)))
  const assignees = Array.from(new Set(mockTasks.map(task => task.assignedTo)))

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCase = selectedCase === "all" || task.case.id === selectedCase
    const matchesAssignee = selectedAssignee === "all" || task.assignedTo.id === selectedAssignee
    const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus

    return matchesSearch && matchesCase && matchesAssignee && matchesPriority && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedCase} onValueChange={setSelectedCase}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by case" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cases</SelectItem>
            {cases.map(case_ => (
              <SelectItem key={case_.id} value={case_.id}>
                {case_.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={String(selectedAssignee)} onValueChange={(value) => setSelectedAssignee(value === "all" ? "all" : Number(value))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            {assignees.map(assignee => (
              <SelectItem key={assignee.id} value={String(assignee.id)}>
                {assignee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedPriority} onValueChange={(value) => setSelectedPriority(value as Task["priority"] | "all")}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as Task["status"] | "all")}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card 
            key={task.id} 
            className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => setSelectedTask(task)}
          >
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-start space-x-4">
                {task.status === "overdue" ? (
                  <AlertCircle className="h-5 w-5 text-destructive" />
                ) : task.status === "pending" ? (
                  <Clock className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckSquare className="h-5 w-5 text-primary" />
                )}
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">Due: {new Date(task.dueDate).toLocaleDateString()}</Badge>
                    <Badge variant="outline">Assigned to: {task.assignedTo.name}</Badge>
                    <Badge variant="outline">Case: {task.case.title}</Badge>
                    <Badge 
                      variant="outline"
                      className={
                        task.priority === "high"
                          ? "text-destructive border-destructive"
                          : task.priority === "medium"
                          ? "text-yellow-500 border-yellow-500"
                          : "text-muted-foreground"
                      }
                    >
                      {task.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No tasks found matching your filters
          </div>
        )}
      </div>

      <TaskDetails
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  )
}