import { CheckSquare, AlertCircle, Clock } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Review Smith Case Documents",
    dueDate: "2024-02-20",
    priority: "high",
    status: "pending",
  },
  {
    id: 2,
    title: "Prepare Motion Draft",
    dueDate: "2024-02-22",
    priority: "high",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Client Consultation - Johnson",
    dueDate: "2024-02-23",
    priority: "medium",
    status: "scheduled",
  },
]

export function LawyerTaskList() {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between space-x-4 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer"
        >
          <div className="flex items-start space-x-4">
            {task.status === "pending" ? (
              <AlertCircle className="h-5 w-5 text-destructive" />
            ) : task.status === "in-progress" ? (
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