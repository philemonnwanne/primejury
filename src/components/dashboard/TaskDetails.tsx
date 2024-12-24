import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Bell, Calendar, MessageSquare, User } from "lucide-react"
import { Task } from "./types"

interface TaskDetailsProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export function TaskDetails({ task, isOpen, onClose }: TaskDetailsProps) {
  const [note, setNote] = useState("")
  const { toast } = useToast()

  if (!task) return null

  const handleSendReminder = () => {
    toast({
      title: "Reminder Sent",
      description: `A reminder has been sent for the task "${task.title}"`,
    })
  }

  const handleAddNote = () => {
    if (!note.trim()) return
    
    toast({
      title: "Note Added",
      description: "Your note has been added to the task",
    })
    setNote("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{task.title}</DialogTitle>
          <DialogDescription>
            Created for case: {task.case.title}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-4">
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Assigned to: {task.assignedTo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={
                    task.priority === "high" 
                      ? "destructive" 
                      : task.priority === "medium" 
                      ? "default" 
                      : "secondary"
                  }
                >
                  {task.priority.toUpperCase()}
                </Badge>
                <Badge 
                  variant={
                    task.status === "overdue" 
                      ? "destructive" 
                      : task.status === "completed" 
                      ? "default" 
                      : "secondary"
                  }
                >
                  {task.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Add Note</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSendReminder}
                  className="gap-2"
                >
                  <Bell className="h-4 w-4" />
                  Send Reminder
                </Button>
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a note about this task..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={handleAddNote}
                  className="gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}