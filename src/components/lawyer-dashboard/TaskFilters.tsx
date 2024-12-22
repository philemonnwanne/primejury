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
  selectedCase: string | "all"
  onStatusChange: (status: TaskStatus | "all") => void
  onPriorityChange: (priority: TaskPriority | "all") => void
  onSortChange: (sort: SortOption) => void
  onCaseChange: (caseId: string | "all") => void
}

const mockCases = [
  { id: "case1", title: "Johnson vs. Smith Corp" },
  { id: "case2", title: "Tech Corp Merger" },
  { id: "case3", title: "Estate Planning - Brown" },
]

export function TaskFilters({
  status,
  priority,
  sortBy,
  selectedCase,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onCaseChange,
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

      <Select value={selectedCase} onValueChange={onCaseChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter by case" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cases</SelectItem>
          {mockCases.map(case_ => (
            <SelectItem key={case_.id} value={case_.id}>
              {case_.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}