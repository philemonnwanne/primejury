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

export function TaskList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCase, setSelectedCase] = useState<string>("all")
  const [selectedAssignee, setSelectedAssignee] = useState<number | "all">("all")
  const [selectedPriority, setSelectedPriority] = useState<Task["priority"] | "all">("all")
  const [selectedStatus, setSelectedStatus] = useState<Task["status"] | "all">("all")

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
    <div className="space-y-6">
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
          <div
            key={task.id}
            className="flex items-center justify-between space-x-4 rounded-lg border p-4"
          >
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
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Assigned to: {task.assignedTo.name}</span>
                  <span>•</span>
                  <span>Case: {task.case.title}</span>
                </div>
              </div>
            </div>
            <span
              className={`text-xs font-medium ${
                task.priority === "high"
                  ? "text-destructive"
                  : task.priority === "medium"
                  ? "text-yellow-500"
                  : "text-muted-foreground"
              }`}
            >
              {task.priority.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}