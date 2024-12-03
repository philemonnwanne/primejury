import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const events = [
  { date: new Date(2024, 2, 15), type: "hearing", title: "Smith vs. Johnson Hearing" },
  { date: new Date(2024, 2, 20), type: "deadline", title: "File Motion Due" },
  { date: new Date(2024, 2, 25), type: "meeting", title: "Client Consultation" },
]

export function LawyerCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const getDayEvents = (day: Date) => {
    return events.filter(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <div className="space-y-2">
            <h4 className="font-medium">Events for {date?.toLocaleDateString()}</h4>
            {date && getDayEvents(date).map((event, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                <span>{event.title}</span>
                <Badge variant={event.type === "hearing" ? "destructive" : "secondary"}>
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}