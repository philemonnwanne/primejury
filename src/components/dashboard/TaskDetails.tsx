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
import { Bell, Calendar, MessageSquare, User, UserMinus, UserPlus, PenSquare } from "lucide-react"
import { Task } from "./types"
import { staffMembers } from "../staff/mock-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface TaskDetailsProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export function TaskDetails({ task, isOpen, onClose }: TaskDetailsProps) {
  const [note, setNote] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState("")
  const [editedDueDate, setEditedDueDate] = useState("")
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

  const handleAssignStaff = (staffId: string) => {
    toast({
      title: "Staff Assigned",
      description: "The task has been assigned to the selected staff member",
    })
  }

  const handleUnassignStaff = () => {
    toast({
      title: "Staff Unassigned",
      description: "The staff member has been unassigned from this task",
    })
  }

  const handleStartEditing = () => {
    setIsEditing(true)
    setEditedDescription(task.description)
    setEditedDueDate(task.dueDate.split('T')[0]) // Format date for input
  }

  const handleSaveEdits = () => {
    toast({
      title: "Task Updated",
      description: "The task details have been updated successfully",
    })
    setIsEditing(false)
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      type="date"
                      value={editedDueDate}
                      onChange={(e) => setEditedDueDate(e.target.value)}
                      className="w-40"
                    />
                  ) : (
                    <span className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                </div>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStartEditing}
                    className="gap-2"
                  >
                    <PenSquare className="h-4 w-4" />
                    Edit Task
                  </Button>
                )}
                {isEditing && (
                  <Button
                    size="sm"
                    onClick={handleSaveEdits}
                    className="gap-2"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Assigned to: {task.assignedTo.name}</span>
                </div>
                <div className="flex gap-2">
                  <Select onValueChange={handleAssignStaff}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Assign to staff" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map((staff) => (
                        <SelectItem key={staff.id} value={String(staff.id)}>
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleUnassignStaff}
                    title="Unassign staff"
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                </div>
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
              {isEditing ? (
                <Textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{task.description}</p>
              )}
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