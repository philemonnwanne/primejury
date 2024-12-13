import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { UpcomingEvents } from "@/components/lawyer-dashboard/calendar/UpcomingEvents"
import { ScheduleEventDialog } from "@/components/lawyer-dashboard/calendar/ScheduleEventDialog"
import { ShareCalendarDialog } from "@/components/lawyer-dashboard/calendar/ShareCalendarDialog"
import { CalendarFilters } from "@/components/lawyer-dashboard/calendar/CalendarFilters"
import { CalendarSettings } from "@/components/lawyer-dashboard/calendar/CalendarSettings"
import { CalendarSync } from "@/components/lawyer-dashboard/calendar/CalendarSync"
import { useState } from "react"
import { CalendarEvent } from "@/types/calendar"
import { addDays } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Client Meeting - Smith Case",
    start: addDays(new Date(), 1),
    end: addDays(new Date(), 1),
    type: "meeting",
    caseName: "Smith vs. Johnson",
  },
  {
    id: "2",
    title: "Court Hearing",
    start: addDays(new Date(), 3),
    end: addDays(new Date(), 3),
    type: "court-date",
    caseName: "State vs. Brown",
  },
  {
    id: "3",
    title: "Document Filing Deadline",
    start: addDays(new Date(), 5),
    end: addDays(new Date(), 5),
    type: "deadline",
    caseName: "Williams Estate",
  },
]

export default function LawyerCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day">("month")
  const { toast } = useToast()

  const handleEventScheduled = (newEvent: CalendarEvent) => {
    setEvents([...events, newEvent])
    toast({
      title: "Event Scheduled",
      description: "Your event has been successfully added to the calendar.",
    })
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
      </div>
    </LawyerDashboardLayout>
  )
}