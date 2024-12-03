import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Clock, Flag, Link as LinkIcon } from "lucide-react"

interface TaskDetailsProps {
  task: {
    id: number
    title: string
    description: string
    status: string
    priority: string
    dueDate: string
    linkedCase: string
  }
}

export function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>Task #{task.id}</CardDescription>
          </div>
          <Badge
            variant={
              task.status === "completed"
                ? "default"
                : task.status === "in-progress"
                ? "secondary"
                : "destructive"
            }
          >
            {task.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Flag className="h-4 w-4" />
            Priority: {task.priority}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Due Date: {new Date(task.dueDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LinkIcon className="h-4 w-4" />
            Linked Case: {task.linkedCase}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last Updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Description</h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            Edit Task
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Task
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}