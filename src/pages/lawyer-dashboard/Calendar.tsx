import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { DayActivitiesDialog } from "@/components/lawyer-dashboard/calendar/DayActivitiesDialog"
import { ScheduleEventDialog } from "@/components/lawyer-dashboard/calendar/ScheduleEventDialog"
import { CalendarSync } from "@/components/lawyer-dashboard/calendar/CalendarSync"
import { CalendarEvent } from "@/types/calendar"
import { addDays } from "date-fns"

const workingHours = {
  start: "09:00",
  end: "17:00",
}

// Mock data for calendar events
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Client Meeting - Smith Case",
    type: "meeting",
    start: new Date(2024, 2, 20, 10, 0),
    end: new Date(2024, 2, 20, 11, 0),
    description: "Initial consultation with Smith regarding contract dispute",
    caseId: "case_123",
    isSharedWithClient: true,
  },
  {
    id: "2",
    title: "Court Hearing - Johnson Case",
    type: "court-date",
    start: new Date(2024, 2, 21, 14, 0),
    end: new Date(2024, 2, 21, 16, 0),
    description: "Preliminary hearing for contract dispute case",
    caseId: "case_456",
    location: "Sacramento County Superior Court",
  },
  {
    id: "3",
    title: "Document Review Deadline",
    type: "deadline",
    start: new Date(2024, 2, 22, 17, 0),
    end: new Date(2024, 2, 22, 17, 0),
    description: "Review and submit case documents",
    caseId: "case_789",
  },
]

// Mock data for cases
const mockCases = [
  { id: "case_123", title: "Smith vs. Johnson" },
  { id: "case_456", title: "Tech Corp Merger" },
  { id: "case_789", title: "Estate Planning - Brown" },
]

export default function LawyerCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsDialogOpen(true)
  }

  const handleEventScheduled = (newEvent: CalendarEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const getDayContent = (date: Date) => {
    const dayEvents = getEventsForDate(date)
    return dayEvents.length > 0 ? (
      <div className="w-full h-full">
        <div className="text-right">{date.getDate()}</div>
        <div className="mt-1">
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="text-xs truncate px-1 rounded-sm mb-1"
              style={{
                backgroundColor:
                  event.type === "court-date"
                    ? "rgba(239, 68, 68, 0.2)"
                    : event.type === "deadline"
                    ? "rgba(245, 158, 11, 0.2)"
                    : "rgba(59, 130, 246, 0.2)",
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="text-right">{date.getDate()}</div>
    )
  }

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your schedule and appointments
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={view} onValueChange={(v) => setView(v as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month View</SelectItem>
                <SelectItem value="week">Week View</SelectItem>
                <SelectItem value="day">Day View</SelectItem>
              </SelectContent>
            </Select>
            <CalendarSync />
            <ScheduleEventDialog
              onEventScheduled={handleEventScheduled}
              selectedDate={selectedDate}
              cases={mockCases}
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && handleDateSelect(date)}
              className="rounded-md border"
              components={{
                DayContent: ({ date }) => getDayContent(date),
              }}
            />
          </CardContent>
        </Card>

        <DayActivitiesDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          date={selectedDate}
          events={events}
          workingHours={workingHours}
          onEventScheduled={(event) => {
            handleEventScheduled(event)
            setIsDialogOpen(false)
          }}
        />
      </div>
    </LawyerDashboardLayout>
  )
}