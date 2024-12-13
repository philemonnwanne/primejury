import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { addMonths, format, isSameDay } from "date-fns"

const events = [
  {
    date: new Date(2024, 1, 15),
    title: "Client Meeting - Smith Case",
    type: "meeting",
    time: "10:00 AM",
    duration: "1 hour",
    description: "Initial consultation regarding property dispute",
  },
  {
    date: new Date(2024, 1, 18),
    title: "Court Hearing - Johnson vs. Tech Corp",
    type: "hearing",
    time: "2:00 PM",
    duration: "2 hours",
    description: "Preliminary hearing for patent infringement case",
  },
  {
    date: new Date(2024, 1, 20),
    title: "Document Filing Deadline",
    type: "deadline",
    time: "5:00 PM",
    description: "Final deadline for submitting amended complaint",
  },
]

export function LawyerCalendar() {
  const today = new Date()
  const sixMonthsFromNow = addMonths(today, 6)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today)

  const getDayEvents = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  const selectedDayEvents = selectedDate ? getDayEvents(selectedDate) : []

  const handleDateSelect = (date: Date | undefined) => {
    console.log("Selected date:", date) // Add logging to debug
    setSelectedDate(date)
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
      </CardContent>
    </Card>
  )
}