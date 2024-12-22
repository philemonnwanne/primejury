import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarEvent } from "@/types/calendar"
import { useState, useEffect } from "react"

interface EventDetailsSheetProps {
  event: CalendarEvent | null
  onClose: () => void
  onUpdate: (event: CalendarEvent) => void
  onDelete: (eventId: string) => void
}

export function EventDetailsSheet({
  event,
  onClose,
  onUpdate,
  onDelete,
}: EventDetailsSheetProps) {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({})

  useEffect(() => {
    if (event) {
      setFormData(event)
    }
  }, [event])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData && event) {
      onUpdate({ ...event, ...formData })
    }
  }

  return (
    <Sheet open={!!event} onOpenChange={() => onClose()}>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Event Details</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value as CalendarEvent["type"] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="start">Start Time</Label>
            <Input
              id="start"
              type="datetime-local"
              value={
                formData.start
                  ? new Date(formData.start).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setFormData({ ...formData, start: new Date(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end">End Time</Label>
            <Input
              id="end"
              type="datetime-local"
              value={
                formData.end
                  ? new Date(formData.end).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setFormData({ ...formData, end: new Date(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="destructive"
              onClick={() => event && onDelete(event.id)}
            >
              Delete Event
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Event</Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}