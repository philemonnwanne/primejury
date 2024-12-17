import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { UpcomingEvents } from "@/components/lawyer-dashboard/calendar/UpcomingEvents"
import { ScheduleEventDialog } from "@/components/lawyer-dashboard/calendar/ScheduleEventDialog"
import { ShareCalendarDialog } from "@/components/lawyer-dashboard/calendar/ShareCalendarDialog"
import { CalendarFilters } from "@/components/lawyer-dashboard/calendar/CalendarFilters"
import { CalendarSettings } from "@/components/lawyer-dashboard/calendar/CalendarSettings"
import { CalendarSync } from "@/components/lawyer-dashboard/calendar/CalendarSync"
import { DayActivitiesDialog } from "@/components/lawyer-dashboard/calendar/DayActivitiesDialog"
import { useState } from "react"
import { CalendarEvent } from "@/types/calendar"
import { addDays, isSameDay } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Client Meeting - Smith Case",
    start: addDays(new Date(), 1),
    end: addDays(new Date(), 1),
    type: "meeting",
    caseName: "Smith vs. Johnson",
    caseId: "case1"
  },
  {
    id: "2",
    title: "Court Hearing",
    start: addDays(new Date(), 3),
    end: addDays(new Date(), 3),
    type: "court-date",
    caseName: "State vs. Brown",
    caseId: "case2"
  },
  {
    id: "3",
    title: "Document Filing Deadline",
    start: addDays(new Date(), 5),
    end: addDays(new Date(), 5),
    type: "deadline",
    caseName: "Williams Estate",
    caseId: "case3"
  },
]

const mockCases = [
  { id: "case1", title: "Smith vs. Johnson" },
  { id: "case2", title: "State vs. Brown" },
  { id: "case3", title: "Williams Estate" },
]

const workingHours = {
  start: "09:00",
  end: "17:00",
}

export default function LawyerCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day">("month")
  const [showDayActivities, setShowDayActivities] = useState(false)
  const { toast } = useToast()

  const handleEventScheduled = (newEvent: CalendarEvent) => {
    setEvents([...events, newEvent])
    toast({
      title: "Event Scheduled",
      description: "Your event has been successfully added to the calendar.",
    })
  }

  const getDayEvents = (date: Date) => {
    return events.filter(event => isSameDay(event.start, date))
  }

  const modifiers = {
    hasEvents: (date: Date) => getDayEvents(date).length > 0,
  }

  const modifiersStyles = {
    hasEvents: {
      backgroundColor: "var(--accent)",
      color: "var(--accent-foreground)",
      fontWeight: "bold",
    },
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setShowDayActivities(true)
    }
  }

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <div className="flex gap-2">
            <CalendarSync />
            <CalendarSettings />
            <ScheduleEventDialog
              onEventScheduled={handleEventScheduled}
              selectedDate={selectedDate}
              cases={mockCases}
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
                onSelect={handleDateSelect}
                className="rounded-md border mt-4"
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </Card>
          </div>

          <div className="space-y-6">
            <UpcomingEvents events={events} />
          </div>
        </div>

        {selectedDate && (
          <DayActivitiesDialog
            isOpen={showDayActivities}
            onOpenChange={setShowDayActivities}
            date={selectedDate}
            events={getDayEvents(selectedDate)}
            workingHours={workingHours}
          />
        )}
      </div>
    </LawyerDashboardLayout>
  )
}