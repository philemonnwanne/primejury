import { useState } from "react"
import { Check, Flag, Calendar, X } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const tasks = [
  {
    id: 1,
    title: "Review Case Documents - Smith vs. Corp",
    status: "pending",
    priority: "high",
    dueDate: "2024-02-25",
    linkedCase: "Smith vs. Corp",
  },
  {
    id: 2,
    title: "Prepare Court Filing",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-02-28",
    linkedCase: "Johnson Estate",
  },
  {
    id: 3,
    title: "Client Meeting Notes",
    status: "completed",
    priority: "low",
    dueDate: "2024-02-22",
    linkedCase: "Davis Trust",
  },
]

export function LawyerTaskList() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === "all" || task.status === statusFilter
    const priorityMatch = priorityFilter === "all" || task.priority === priorityFilter
    return statusMatch && priorityMatch
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Linked Case</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                {task.status === "completed" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : task.status === "in-progress" ? (
                  <Calendar className="h-4 w-4 text-blue-500" />
                ) : (
                  <X className="h-4 w-4 text-gray-500" />
                )}
              </TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    task.priority === "high"
                      ? "destructive"
                      : task.priority === "medium"
                      ? "default"
                      : "secondary"
                  }
                >
                  {task.priority === "high" && <Flag className="mr-1 h-3 w-3" />}
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>{task.linkedCase}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}