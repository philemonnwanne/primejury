import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TaskStatus, TaskPriority, SortOption } from "@/pages/lawyer-dashboard/Tasks"

interface TaskFiltersProps {
  status: TaskStatus | "all"
  priority: TaskPriority | "all"
  sortBy: SortOption
  onStatusChange: (status: TaskStatus | "all") => void
  onPriorityChange: (priority: TaskPriority | "all") => void
  onSortChange: (sort: SortOption) => void
}

export function TaskFilters({
  status,
  priority,
  sortBy,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <Select value={status} onValueChange={(value) => onStatusChange(value as TaskStatus | "all")}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priority} onValueChange={(value) => onPriorityChange(value as TaskPriority | "all")}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="priority">Priority</SelectItem>
          <SelectItem value="dueDate">Due Date</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}