import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarEvent } from "@/types/calendar"
import { ScheduleEventDialog } from "./calendar/ScheduleEventDialog"
import { CalendarSync } from "./calendar/CalendarSync"
import { DayActivitiesDialog } from "./calendar/DayActivitiesDialog"
import { CalendarViews } from "./calendar/CalendarViews"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Client Meeting",
    type: "meeting",
    start: new Date(2024, 2, 15, 10, 0),
    end: new Date(2024, 2, 15, 11, 0),
    description: "Initial consultation with new client"
  },
  {
    id: "2",
    title: "Court Hearing",
    type: "court-date",
    start: new Date(2024, 2, 15, 14, 0),
    end: new Date(2024, 2, 15, 16, 0),
    description: "Preliminary hearing for Case #123"
  }
]

const mockCases = [
  { id: "1", title: "Smith vs. Johnson" },
  { id: "2", title: "Tech Corp Merger" },
  { id: "3", title: "Estate Planning - Brown Family" }
]

export function LawyerCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [view, setView] = useState<"week" | "day" | "list">("week")
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const workingHours = {
    start: "09:00",
    end: "17:00"
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mini Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>View Options</CardTitle>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={view}
              onValueChange={(value) => value && setView(value as typeof view)}
              className="flex flex-col space-y-2"
            >
              <ToggleGroupItem value="week" className="w-full">
                Week View
              </ToggleGroupItem>
              <ToggleGroupItem value="day" className="w-full">
                Day View
              </ToggleGroupItem>
              <ToggleGroupItem value="list" className="w-full">
                List View
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Calendar</CardTitle>
          <div className="flex gap-2">
            <CalendarSync />
            <ScheduleEventDialog
              onEventScheduled={(event) => {
                console.log("Event scheduled:", event)
                // Add event handling logic here
              }}
              cases={mockCases}
            />
          </div>
        </CardHeader>
        <CardContent>
          <CalendarViews
            selectedDate={selectedDate || new Date()}
            view={view}
            events={mockEvents}
            onEventClick={handleEventClick}
          />
        </CardContent>
      </Card>

      {selectedDate && (
        <DayActivitiesDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          date={selectedDate}
          events={mockEvents}
          workingHours={workingHours}
          onEventScheduled={(event) => {
            console.log("Event scheduled:", event)
            // Add event handling logic here
          }}
        />
      )}
    </div>
  )
}