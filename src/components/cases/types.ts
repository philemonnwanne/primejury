export interface Case {
  id: string
  title: string
  type: string
  client: string
  lawyer: string
  status: "active" | "pending" | "pending_review" | "closed"
  priority: "high" | "medium" | "low"
  createdAt: string
}

export const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const