import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  type: "deadline" | "meeting" | "hearing" | "other"
  createdAt: string
}

interface CaseCalendarTabProps {
  caseId: string
}

export function CaseCalendarTab({ caseId }: CaseCalendarTabProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    type: "meeting" as const
  })
  const { toast } = useToast()

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title) return

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
      date: selectedDate,
      createdAt: new Date().toISOString()
    }

    setEvents([event, ...events])
    setNewEvent({
      title: "",
      description: "",
      type: "meeting"
    })
    setSelectedDate(undefined)
    toast({
      title: "Event Added",
      description: "Your event has been added successfully.",
    })
  }

  const getEventTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "deadline": return "text-red-500"
      case "meeting": return "text-blue-500"
      case "hearing": return "text-purple-500"
      default: return "text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <Textarea
                placeholder="Event description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <Select
                value={newEvent.type}
                onValueChange={(value: Event["type"]) => 
                  setNewEvent({ ...newEvent, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="hearing">Hearing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleAddEvent} 
                className="w-full"
                disabled={!selectedDate || !newEvent.title}
              >
                Add Event
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{event.title}</span>
                      <span className={`text-sm ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}