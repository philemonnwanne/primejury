import { useState } from "react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarEvent } from "@/types/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CalendarViewsProps {
  selectedDate: Date
  view: "week" | "day" | "list"
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

export function CalendarViews({
  selectedDate,
  view,
  events,
  onEventClick,
}: CalendarViewsProps) {
  const weekStart = startOfWeek(selectedDate)
  const weekEnd = endOfWeek(selectedDate)
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const renderWeekView = () => (
    <div className="grid grid-cols-7 gap-4">
      {daysInWeek.map((day) => (
        <div key={day.toString()} className="min-h-[200px]">
          <div className="text-sm font-medium mb-2">
            {format(day, "EEE d")}
          </div>
          <div className="space-y-2">
            {getEventsForDate(day).map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className="cursor-pointer p-2 rounded-md bg-accent hover:bg-accent/80"
              >
                <div className="text-sm font-medium">{event.title}</div>
                <div className="text-xs text-muted-foreground">
                  {format(event.start, "HH:mm")}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderDayView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {format(selectedDate, "EEEE, MMMM d")}
      </h3>
      <div className="space-y-2">
        {getEventsForDate(selectedDate).map((event) => (
          <Card
            key={event.id}
            className="p-4 cursor-pointer hover:bg-accent/50"
            onClick={() => onEventClick(event)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-muted-foreground">
                  {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}
                </div>
              </div>
              <Badge>{event.type}</Badge>
            </div>
            {event.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {event.description}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )

  const renderListView = () => (
    <ScrollArea className="h-[600px]">
      <div className="space-y-4">
        {events
          .sort((a, b) => a.start.getTime() - b.start.getTime())
          .map((event) => (
            <Card
              key={event.id}
              className="p-4 cursor-pointer hover:bg-accent/50"
              onClick={() => onEventClick(event)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(event.start, "PPP")} at {format(event.start, "HH:mm")}
                  </div>
                </div>
                <Badge>{event.type}</Badge>
              </div>
              {event.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>
              )}
            </Card>
          ))}
      </div>
    </ScrollArea>
  )

  return (
    <div className="p-4">
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayView()}
      {view === "list" && renderListView()}
    </div>
  )
}