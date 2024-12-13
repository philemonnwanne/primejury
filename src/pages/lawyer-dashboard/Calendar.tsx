import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarFilters } from "@/components/lawyer-dashboard/calendar/CalendarFilters"
import { ScheduleEventDialog } from "@/components/lawyer-dashboard/calendar/ScheduleEventDialog"
import { ShareCalendarDialog } from "@/components/lawyer-dashboard/calendar/ShareCalendarDialog"
import { CalendarSettings } from "@/components/lawyer-dashboard/calendar/CalendarSettings"
import { CalendarSync } from "@/components/lawyer-dashboard/calendar/CalendarSync"
import { useState } from "react"
import { CalendarEvent } from "@/types/calendar"
import { addDays, format, isSameDay } from "date-fns"

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "Client Meeting - Brown Case",
    start: new Date(2024, 2, 4, 9, 0),
    end: new Date(2024, 2, 4, 10, 0),
    type: "meeting",
    description: "Initial consultation regarding employment dispute",
    caseName: "Brown vs. Corp"
  },
  {
    id: "2",
    title: "Document Review - Smith Estate",
    start: new Date(2024, 2, 4, 14, 0),
    end: new Date(2024, 2, 4, 17, 0),
    type: "deadline",
    description: "Review and finalize estate planning documents",
    caseName: "Smith Estate"
  },
  {
    id: "3",
    title: "Court Hearing - Johnson vs. MegaCorp",
    start: new Date(2024, 2, 7, 10, 30),
    end: new Date(2024, 2, 7, 12, 30),
    type: "hearing",
    description: "Summary judgment hearing",
    caseName: "Johnson vs. MegaCorp"
  }
]

export default function LawyerCalendar() {
  const [events] = useState<CalendarEvent[]>(mockEvents)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day">("month")

  const getDayEvents = (date: Date) => {
    return events.filter((event) => date && event.start && isSameDay(event.start, date))
  }

  const selectedDayEvents = selectedDate ? getDayEvents(selectedDate) : []

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <div className="flex gap-2">
            <CalendarSync />
            <CalendarSettings />
            <ScheduleEventDialog
              onEventScheduled={(event) => console.log('Event scheduled:', event)}
              selectedDate={selectedDate}
            />
            <ShareCalendarDialog />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <Card className="p-4">
              <CalendarFilters
                selectedView={selectedView}
                onViewChange={setSelectedView}
              />
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mt-4"
              />
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? `Activities for ${format(selectedDate, "MMMM d, yyyy")}`
                    : "Select a date"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedDayEvents.length > 0 ? (
                    selectedDayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex flex-col space-y-2 rounded-md border p-3 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{event.title}</span>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Time: {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}</p>
                          {event.caseName && <p>Case: {event.caseName}</p>}
                          {event.description && (
                            <p className="text-xs">{event.description}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No activities scheduled for this day
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}