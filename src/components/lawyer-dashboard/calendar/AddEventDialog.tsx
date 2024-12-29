import { CalendarEvent } from "@/types/calendar"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface AddEventDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddEvent: (event: CalendarEvent) => void
}

export function AddEventDialog({ isOpen, onClose, onAddEvent }: AddEventDialogProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = () => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title,
      date,
      time,
    }
    onAddEvent(newEvent)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>Add Event</Dialog.Title>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </div>
          <div>
            <Label htmlFor="date">Event Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="time">Event Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Event</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
