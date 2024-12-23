import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { CalendarEvent } from "@/types/calendar"
import { Card } from "@/components/ui/card"

interface CalendarViewContentProps {
  view: "month" | "week" | "day" | "list"
  selectedDate: Date
  events: CalendarEvent[]
}

export function CalendarViewContent({
  view,
  selectedDate,
  events,
}: CalendarViewContentProps) {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start)
    if (view === "day") {
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      )
    } else if (view === "week") {
      const startOfWeek = new Date(selectedDate)
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      return eventDate >= startOfWeek && eventDate <= endOfWeek
    }
    return true // List view shows all events
  })

  if (view === "list") {
    return (
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {format(event.start, "PPP")} at {format(event.start, "p")}
                </p>
              </div>
              <Badge variant="outline">{event.type}</Badge>
            </div>
            {event.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {event.description}
              </p>
            )}
          </Card>
        ))}
        {filteredEvents.length === 0 && (
          <p className="text-center text-muted-foreground">No events found</p>
        )}
      </div>
    )
  }

  if (view === "day") {
    return (
      <div className="space-y-2">
        {Array.from({ length: 24 }).map((_, hour) => {
          const timeSlotEvents = filteredEvents.filter((event) => {
            const eventHour = new Date(event.start).getHours()
            return eventHour === hour
          })

          return (
            <div key={hour} className="flex items-start gap-4 p-2 hover:bg-accent/50 rounded-lg">
              <div className="w-16 text-sm text-muted-foreground">
                {format(new Date().setHours(hour, 0), "h a")}
              </div>
              <div className="flex-1">
                {timeSlotEvents.map((event) => (
                  <Card key={event.id} className="p-2 mb-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (view === "week") {
    return (
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, dayIndex) => {
          const currentDate = new Date(selectedDate)
          currentDate.setDate(selectedDate.getDate() - selectedDate.getDay() + dayIndex)
          
          const dayEvents = filteredEvents.filter((event) => {
            const eventDate = new Date(event.start)
            return (
              eventDate.getDate() === currentDate.getDate() &&
              eventDate.getMonth() === currentDate.getMonth() &&
              eventDate.getFullYear() === currentDate.getFullYear()
            )
          })

          return (
            <div key={dayIndex} className="space-y-2">
              <div className="text-sm font-medium">
                {format(currentDate, "EEE, MMM d")}
              </div>
              {dayEvents.map((event) => (
                <Card key={event.id} className="p-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {format(event.start, "p")}
                      </p>
                    </div>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          )
        })}
      </div>
    )
  }

  // Month view (default)
  return (
    <div className="grid grid-cols-7 gap-4">
      {Array.from({ length: 35 }).map((_, index) => {
        const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
        currentDate.setDate(currentDate.getDate() + index - currentDate.getDay())
        
        const dayEvents = filteredEvents.filter((event) => {
          const eventDate = new Date(event.start)
          return (
            eventDate.getDate() === currentDate.getDate() &&
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getFullYear() === currentDate.getFullYear()
          )
        })

        const isCurrentMonth = currentDate.getMonth() === selectedDate.getMonth()

        return (
          <div
            key={index}
            className={`space-y-2 p-2 rounded-lg ${
              isCurrentMonth ? "bg-card" : "bg-muted/50"
            }`}
          >
            <div className="text-sm font-medium">
              {format(currentDate, "d")}
            </div>
            {dayEvents.map((event) => (
              <Card key={event.id} className="p-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )
      })}
    </div>
  )
}