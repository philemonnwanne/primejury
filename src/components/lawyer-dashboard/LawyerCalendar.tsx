import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    date: new Date(2024, 1, 15),
    title: "Client Meeting - Smith Case",
    type: "meeting",
  },
  {
    date: new Date(2024, 1, 18),
    title: "Court Hearing - Johnson vs. Tech Corp",
    type: "hearing",
  },
  {
    date: new Date(2024, 1, 20),
    title: "Document Filing Deadline",
    type: "deadline",
  },
]

export function LawyerCalendar() {
  const today = new Date()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[1fr_250px]">
          <Calendar
            mode="single"
            selected={today}
            className="rounded-md border"
          />
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Upcoming Events</h4>
            <div className="space-y-2">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-1 rounded-md border p-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{event.title}</span>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {event.date.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}