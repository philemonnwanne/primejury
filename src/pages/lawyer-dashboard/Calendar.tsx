import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarEvent } from "@/types/calendar"
import { ScheduleEventDialog } from "@/components/lawyer-dashboard/calendar/ScheduleEventDialog"
import { CalendarSync } from "@/components/lawyer-dashboard/calendar/CalendarSync"
import { DayActivitiesDialog } from "@/components/lawyer-dashboard/calendar/DayActivitiesDialog"
import { CalendarFilters } from "@/components/lawyer-dashboard/calendar/CalendarFilters"
import { CalendarViewContent } from "@/components/lawyer-dashboard/calendar/CalendarViewContent"

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Client Meeting",
    type: "meeting",
    start: new Date(2024, 2, 15, 10, 0),
    end: new Date(2024, 2, 15, 11, 0),
    description: "Initial consultation with new client"
  },
  {
    id: "2",
    title: "Court Hearing",
    type: "court-date",
    start: new Date(2024, 2, 15, 14, 0),
    end: new Date(2024, 2, 15, 16, 0),
    description: "Preliminary hearing for Case #123"
  }
]

const mockCases = [
  { id: "1", title: "Smith vs. Johnson" },
  { id: "2", title: "Tech Corp Merger" },
  { id: "3", title: "Estate Planning - Brown Family" }
]

export default function LawyerCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [view, setView] = useState<"month" | "week" | "day" | "list">("month")

  const workingHours = {
    start: "09:00",
    end: "17:00"
  }

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setIsDialogOpen(true)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Calendar</CardTitle>
          <div className="flex gap-2">
            <CalendarSync />
            <ScheduleEventDialog
              onEventScheduled={(event) => {
                console.log("Event scheduled:", event)
                // Add event handling logic here
              }}
              cases={mockCases}
            />
          </div>
        </CardHeader>
        <CardContent>
          <CalendarFilters selectedView={view} onViewChange={setView} />
          <div className="mt-4">
            <CalendarViewContent
              view={view}
              selectedDate={selectedDate}
              events={mockEvents}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {selectedDate && (
        <DayActivitiesDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          workingHours={workingHours}
          onEventScheduled={(event) => {
            console.log("Event scheduled:", event)
            // Add event handling logic here
          }}
        />
      )}
    </div>
  )
}
