import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

type EventType = "meeting" | "deadline" | "hearing" | "other";

interface Event {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time?: string;
  description?: string;
}

export function CaseCalendarTab() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Client Meeting",
      type: "meeting",
      date: "2024-03-15",
      time: "10:00 AM",
      description: "Discuss case details with the client."
    },
    {
      id: "2",
      title: "Court Hearing",
      type: "hearing",
      date: "2024-03-20",
      time: "1:00 PM",
      description: "Attend the court hearing for the case."
    },
    {
      id: "3",
      title: "Document Submission Deadline",
      type: "deadline",
      date: "2024-03-25",
      description: "Submit all required documents by this date."
    }
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="flex items-center justify-between p-4 border-b">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.date} {event.time && `at ${event.time}`}</p>
                <p className="text-sm">{event.description}</p>
              </div>
              <span className="text-sm">{event.type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
