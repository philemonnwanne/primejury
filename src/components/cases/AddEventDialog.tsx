import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Loader } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddEventDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddEvent: (event: {
    date: string
    title: string
    description: string
    status: "completed" | "current" | "upcoming"
  }) => void
}

export function AddEventDialog({ isOpen, onClose, onAddEvent }: AddEventDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState<"completed" | "current" | "upcoming">("upcoming")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddEvent({
      title,
      description,
      date,
      status,
    })
    setTitle("")
    setDescription("")
    setDate("")
    setStatus("upcoming")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: "completed" | "current" | "upcoming") => setStatus(value)}>
              <SelectTrigger>
                <SelectValue>
                  {status === "completed" && (
                    <span className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Completed
                    </span>
                  )}
                  {status === "current" && (
                    <span className="flex items-center">
                      <Loader className={cn(
                        "mr-2 h-4 w-4 text-purple-500",
                        "animate-spin"
                      )} />
                      In Progress
                    </span>
                  )}
                  {status === "upcoming" && "Upcoming"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">
                  <span className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Completed
                  </span>
                </SelectItem>
                <SelectItem value="current">
                  <span className="flex items-center">
                    <Loader className="mr-2 h-4 w-4 text-purple-500" />
                    In Progress
                  </span>
                </SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}