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
const events = [
  {
    date: new Date(2024, 11, 4),
    title: "Client Meeting - Brown Case",
    type: "meeting",
    time: "09:00 AM",
    duration: "1 hour",
    description: "Initial consultation regarding employment dispute",
  },
  {
    date: new Date(2024, 11, 4),
    title: "Document Review - Smith Estate",
    type: "deadline",
    time: "02:00 PM",
    duration: "3 hours",
    description: "Review and finalize estate planning documents",
  },
  {
    date: new Date(2024, 11, 7),
    title: "Court Hearing - Johnson vs. MegaCorp",
    type: "hearing",
    time: "10:30 AM",
    duration: "2 hours",
    description: "Summary judgment hearing",
  },
  {
    date: new Date(2024, 11, 11),
    title: "Settlement Conference",
    type: "meeting",
    time: "01:00 PM",
    duration: "4 hours",
    description: "Mediation session for Davis personal injury case",
  },
  {
    date: new Date(2024, 11, 13),
    title: "Expert Witness Deposition",
    type: "meeting",
    time: "09:30 AM",
    duration: "3 hours",
    description: "Deposition of Dr. Smith for medical malpractice case",
  },
  {
    date: new Date(2024, 11, 15),
    title: "Filing Deadline - Wilson Appeal",
    type: "deadline",
    time: "05:00 PM",
    description: "Final deadline for appellate brief submission",
  },
  {
    date: new Date(2024, 11, 18),
    title: "Client Strategy Meeting",
    type: "meeting",
    time: "11:00 AM",
    duration: "1.5 hours",
    description: "Quarterly strategy review with corporate client",
  },
  {
    date: new Date(2024, 11, 20),
    title: "Arbitration Hearing",
    type: "hearing",
    time: "09:00 AM",
    duration: "6 hours",
    description: "Commercial contract dispute resolution",
  },
  {
    date: new Date(2024, 11, 22),
    title: "Expert Report Due",
    type: "deadline",
    time: "04:00 PM",
    description: "Technical expert report for patent case",
  },
  {
    date: new Date(2024, 11, 27),
    title: "Settlement Negotiation",
    type: "meeting",
    time: "02:00 PM",
    duration: "2 hours",
    description: "Final settlement discussion for class action",
  },
  {
    date: new Date(2024, 11, 29),
    title: "Year-End Case Review",
    type: "meeting",
    time: "10:00 AM",
    duration: "4 hours",
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
