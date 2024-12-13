import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"
import { UpcomingEvents } from "@/components/lawyer-dashboard/calendar/UpcomingEvents"
import { ScheduleEventDialog } from "@/components/lawyer-dashboard/calendar/ScheduleEventDialog"
import { ShareCalendarDialog } from "@/components/lawyer-dashboard/calendar/ShareCalendarDialog"
import { CalendarFilters } from "@/components/lawyer-dashboard/calendar/CalendarFilters"
import { CalendarSettings } from "@/components/lawyer-dashboard/calendar/CalendarSettings"
import { CalendarSync } from "@/components/lawyer-dashboard/calendar/CalendarSync"
import { useState } from "react"
import { CalendarEvent } from "@/types/calendar"
import { addMonths } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Client Meeting - Brown Case",
    type: "meeting",
    start: new Date(2024, 11, 4, 9, 0),
    end: new Date(2024, 11, 4, 10, 0),
    description: "Initial consultation regarding employment dispute",
  },
  {
    id: "2",
    title: "Document Review - Smith Estate",
    type: "deadline",
    start: new Date(2024, 11, 4, 14, 0),
    end: new Date(2024, 11, 4, 17, 0),
    description: "Review and finalize estate planning documents",
  },
  {
    id: "3",
    title: "Court Hearing - Johnson vs. MegaCorp",
    type: "hearing",
    start: new Date(2024, 11, 7, 10, 30),
    end: new Date(2024, 11, 7, 12, 30),
    description: "Summary judgment hearing",
  },
  {
    id: "4",
    title: "Settlement Conference",
    type: "meeting",
    start: new Date(2024, 11, 11, 13, 0),
    end: new Date(2024, 11, 11, 17, 0),
    description: "Mediation session for Davis personal injury case",
  },
  {
    id: "5",
    title: "Expert Witness Deposition",
    type: "meeting",
    start: new Date(2024, 11, 13, 9, 30),
    end: new Date(2024, 11, 13, 12, 30),
    description: "Deposition of Dr. Smith for medical malpractice case",
  },
  {
    id: "6",
    title: "Filing Deadline - Wilson Appeal",
    type: "deadline",
    start: new Date(2024, 11, 15, 17, 0),
    end: new Date(2024, 11, 15, 17, 0),
    description: "Final deadline for appellate brief submission",
  },
  {
    id: "7",
    title: "Client Strategy Meeting",
    type: "meeting",
    start: new Date(2024, 11, 18, 11, 0),
    end: new Date(2024, 11, 18, 12, 30),
    description: "Quarterly strategy review with corporate client",
  },
  {
    id: "8",
    title: "Arbitration Hearing",
    type: "hearing",
    start: new Date(2024, 11, 20, 9, 0),
    end: new Date(2024, 11, 20, 15, 0),
    description: "Commercial contract dispute resolution",
  },
  {
    id: "9",
    title: "Expert Report Due",
    type: "deadline",
    start: new Date(2024, 11, 22, 16, 0),
    end: new Date(2024, 11, 22, 16, 0),
    description: "Technical expert report for patent case",
  },
  {
    id: "10",
    title: "Settlement Negotiation",
    type: "meeting",
    start: new Date(2024, 11, 27, 14, 0),
    end: new Date(2024, 11, 27, 16, 0),
    description: "Final settlement discussion for class action",
  },
  {
    id: "11",
    title: "Year-End Case Review",
    type: "meeting",
    start: new Date(2024, 11, 29, 10, 0),
    end: new Date(2024, 11, 29, 14, 0),
    description: "Annual review of active cases and planning",
  }
]

export default function LawyerCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day">("month")
  const { toast } = useToast()

  const handleEventScheduled = (newEvent: CalendarEvent) => {
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
          <LawyerCalendar />
          <div className="space-y-6">
            <UpcomingEvents events={events} />
          </div>
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}
