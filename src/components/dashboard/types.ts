export interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  priority: "high" | "medium" | "low"
  status: "overdue" | "pending" | "in-progress" | "completed"
  assignedTo: {
    id: number
    name: string
    role: string
  }
  case: {
    id: string
    title: string
  }
}