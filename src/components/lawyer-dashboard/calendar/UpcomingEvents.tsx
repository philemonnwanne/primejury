import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarEvent } from "@/types/calendar"
import { format } from "date-fns"

interface UpcomingEventsProps {
  events: CalendarEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  // Filter out events with invalid dates and sort the valid ones
  const sortedEvents = [...events]
    .filter(event => event.start instanceof Date && !isNaN(event.start.getTime()))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const weeklyEvents = sortedEvents.filter(event => {
    const eventDate = event.start;
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= nextWeek;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events This Week</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {weeklyEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="space-y-1">
              <p className="font-medium">{event.title}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{format(event.start, "MMM dd, yyyy h:mm a")}</span>
                {event.caseName && (
                  <span className="text-primary">Case: {event.caseName}</span>
                )}
              </div>
            </div>
            <Badge variant={event.type === "deadline" ? "destructive" : "secondary"}>
              {event.type}
            </Badge>
          </div>
        ))}
        {weeklyEvents.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            No upcoming events this week
          </p>
        )}
      </CardContent>
    </Card>
  )
}