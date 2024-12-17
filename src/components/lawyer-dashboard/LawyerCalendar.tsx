import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { addMonths, format, isSameDay } from "date-fns"
import { DayActivitiesDialog } from "./calendar/DayActivitiesDialog"
import { useToast } from "@/hooks/use-toast"

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

export function LawyerCalendar() {
  const today = new Date()
  const sixMonthsFromNow = addMonths(today, 6)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today)
  const [showDayActivities, setShowDayActivities] = useState(false)
  const { toast } = useToast()

  const getDayEvents = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  const selectedDayEvents = selectedDate ? getDayEvents(selectedDate) : []

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setShowDayActivities(true)
    }
  }

  const handleEventScheduled = (newEvent: CalendarEvent) => {
    events.push(newEvent)
    toast({
      title: "Event Scheduled",
      description: "Your event has been successfully scheduled",
    })
    setShowDayActivities(false)
  }

  const modifiers = {
    hasEvents: (date: Date) => getDayEvents(date).length > 0,
  }

  const modifiersStyles = {
    hasEvents: {
      backgroundColor: "var(--primary)",
      color: "var(--primary-foreground)",
      fontWeight: "bold",
    },
  }

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Schedule a Consultation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[1fr_300px]">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            fromDate={today}
            toDate={sixMonthsFromNow}
            className="rounded-md border"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
          <div className="space-y-4">
            {selectedDate ? (
              <>
                <h4 className="text-sm font-medium">
                  Activities for {format(selectedDate, "MMMM d, yyyy")}
                </h4>
                <div className="space-y-2">
                  {selectedDayEvents.length > 0 ? (
                    selectedDayEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex flex-col space-y-2 rounded-md border p-3 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{event.title}</span>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          {event.time && <p>Time: {event.time}</p>}
                          {event.duration && <p>Duration: {event.duration}</p>}
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
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a date to view activities
              </p>
            )}
          </div>
        </div>

        {selectedDate && (
          <DayActivitiesDialog
            isOpen={showDayActivities}
            onOpenChange={setShowDayActivities}
            date={selectedDate}
            events={selectedDayEvents}
            workingHours={{ start: "09:00", end: "17:00" }}
            onEventScheduled={handleEventScheduled}
          />
        )}
      </CardContent>
    </Card>
  )
}
