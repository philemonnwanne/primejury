import { Task } from "./types"

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Review Johnson Case Documents",
    description: "Review and analyze new evidence submitted for the Johnson case",
    dueDate: "2024-02-20",
    priority: "high",
    status: "overdue",
    assignedTo: {
      id: 1,
      name: "Sarah Palmer",
      role: "Lawyer"
    },
    case: {
      id: "case1",
      title: "Johnson vs. Smith Corp"
    }
  },
  {
    id: 2,
    title: "Prepare Court Filing",
    description: "Draft and review motion for summary judgment",
    dueDate: "2024-02-22",
    priority: "high",
    status: "pending",
    assignedTo: {
      id: 2,
      name: "Michael Chen",
      role: "Paralegal"
    },
    case: {
      id: "case2",
      title: "Tech Corp Merger"
    }
  },
  {
    id: 3,
    title: "Client Meeting Notes",
    description: "Compile and organize meeting notes from client consultation",
    dueDate: "2024-02-23",
    priority: "medium",
    status: "in-progress",
    assignedTo: {
      id: 3,
      name: "Emily Rodriguez",
      role: "Legal Assistant"
    },
    case: {
      id: "case3",
      title: "Estate Planning - Brown"
    }
  }
]