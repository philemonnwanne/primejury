import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { UpcomingEvents } from "@/components/lawyer-dashboard/calendar/UpcomingEvents"
import { ScheduleEventDialog } from "@/components/lawyer-dashboard/calendar/ScheduleEventDialog"
import { CalendarEvent } from "@/types/calendar"
import { useState } from "react"
import { addDays } from "date-fns"

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
];

export default function LawyerCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleEventScheduled = (newEvent: CalendarEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <ScheduleEventDialog 
            onEventScheduled={handleEventScheduled}
            selectedDate={selectedDate}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <UpcomingEvents events={events} />
          </div>
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}