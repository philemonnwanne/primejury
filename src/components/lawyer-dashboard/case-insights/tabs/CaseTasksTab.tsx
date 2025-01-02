import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type TaskPriority = "high" | "medium" | "low";

interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  assignedTo?: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review Contract",
    priority: "high",
    dueDate: "2024-03-20",
    status: "in-progress",
    assignedTo: "Sarah Palmer"
  },
  {
    id: "2",
    title: "Client Meeting",
    priority: "medium",
    dueDate: "2024-03-22",
    status: "pending",
    assignedTo: "Michael Chen"
  },
  {
    id: "3",
    title: "File Organization",
    priority: "low",
    dueDate: "2024-03-23",
    status: "completed",
    assignedTo: "Emily Rodriguez"
  }
]

export function CaseTasksTab() {
  const { toast } = useToast()

  const handleTaskAction = (taskId: string) => {
    toast({
      title: "Task Action",
      description: `Action performed on task ID: ${taskId}`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleTaskAction(task.id)}>
                    Perform Action
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
