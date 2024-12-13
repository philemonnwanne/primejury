import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { addMonths, format, isSameDay } from "date-fns"

const events = [
  {
    id: "1",
    title: "Client Meeting - Brown Case",
    start: new Date(2024, 2, 4, 9, 0),
    end: new Date(2024, 2, 4, 10, 0),
    type: "meeting",
    description: "Initial consultation regarding employment dispute",
  },
  {
    id: "2",
    title: "Document Review - Smith Estate",
    start: new Date(2024, 2, 4, 14, 0),
    end: new Date(2024, 2, 4, 17, 0),
    type: "deadline",
    description: "Review and finalize estate planning documents",
  },
  {
    id: "3",
    title: "Court Hearing - Johnson vs. MegaCorp",
    start: new Date(2024, 2, 7, 10, 30),
    end: new Date(2024, 2, 7, 12, 30),
    type: "hearing",
    description: "Summary judgment hearing",
  },
  {
    id: "4",
    title: "Settlement Conference",
    start: new Date(2024, 2, 11, 13, 0),
    end: new Date(2024, 2, 11, 17, 0),
    type: "meeting",
    description: "Mediation session for Davis personal injury case",
  },
  {
    id: "5",
    title: "Expert Witness Deposition",
    start: new Date(2024, 2, 13, 9, 30),
    end: new Date(2024, 2, 13, 12, 30),
    type: "meeting",
    description: "Deposition of Dr. Smith for medical malpractice case",
  }
]

export function LawyerCalendar() {
  const today = new Date()
  const sixMonthsFromNow = addMonths(today, 6)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today)

  const getDayEvents = (date: Date) => {
    return events.filter((event) => isSameDay(event.start, date))
  }

  const selectedDayEvents = selectedDate ? getDayEvents(selectedDate) : []

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[1fr_300px]">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
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