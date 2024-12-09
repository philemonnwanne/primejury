import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"

const tasks = {
  due: [
    { id: 1, title: "File Motion for Case #123", deadline: "2024-04-20" },
    { id: 2, title: "Review Contract Documents", deadline: "2024-04-22" },
    { id: 3, title: "Client Meeting Preparation", deadline: "2024-04-21" },
  ],
  overdue: [
    { id: 4, title: "Submit Court Documents", deadline: "2024-04-15" },
    { id: 5, title: "Update Case Notes", deadline: "2024-04-16" },
  ],
}

export function TaskStatus() {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Task Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">Due Tasks ({tasks.due.length})</h3>
          </div>
          <div className="space-y-2">
            {tasks.due.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3"
              >
                <span className="text-sm font-medium">{task.title}</span>
                <span className="text-xs text-muted-foreground">
                  Due: {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold">Overdue Tasks ({tasks.overdue.length})</h3>
          </div>
          <div className="space-y-2">
            {tasks.overdue.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
              >
                <span className="text-sm font-medium">{task.title}</span>
                <span className="text-xs text-muted-foreground">
                  Due: {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}