import { CheckSquare, AlertCircle, Clock } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Review Johnson Case Documents",
    dueDate: "2024-02-20",
    priority: "high",
    status: "overdue",
  },
  {
    id: 2,
    title: "Prepare Court Filing",
    dueDate: "2024-02-22",
    priority: "high",
    status: "pending",
  },
  {
    id: 3,
    title: "Client Meeting - Smith LLC",
    dueDate: "2024-02-23",
    priority: "medium",
    status: "in-progress",
  },
]

export function TaskList() {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
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
            <div>
              <p className="text-sm font-medium leading-none">{task.title}</p>
              <p className="text-sm text-muted-foreground">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-medium ${
              task.priority === "high"
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {task.priority.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  )
}