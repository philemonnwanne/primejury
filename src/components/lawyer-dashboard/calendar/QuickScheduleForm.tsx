import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarEvent, CalendarEventType } from "@/types/calendar"
import { Label } from "@/components/ui/label"

interface QuickScheduleFormProps {
  timeSlot: { start: Date; end: Date }
  onSchedule: (event: CalendarEvent) => void
  onCancel: () => void
}

export function QuickScheduleForm({ timeSlot, onSchedule, onCancel }: QuickScheduleFormProps) {
  const [title, setTitle] = useState("")
  const [type, setType] = useState<CalendarEventType>("meeting")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    const event: CalendarEvent = {
      id: crypto.randomUUID(),
      title,
      type,
      start: timeSlot.start,
      end: timeSlot.end,
    }

    onSchedule(event)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter event title"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="type">Event Type</Label>
        <Select value={type} onValueChange={(value) => setType(value as CalendarEventType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="video-conference">Video Conference</SelectItem>
            <SelectItem value="court-date">Court Date</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2 mt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Schedule</Button>
      </div>
    </form>
  )
}