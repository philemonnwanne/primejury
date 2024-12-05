import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { addMonths, format, isSameDay } from "date-fns"
import { toast } from "sonner"

interface LawyerCalendarProps {
  lawyerId: string;
}

// Mock available time slots - in a real app, this would come from an API
const generateAvailableSlots = (date: Date) => {
  return [
    "09:00 AM",
    "10:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
  ]
}

const events = [
  {
    date: new Date(2024, 1, 15),
    title: "Client Meeting - Smith Case",
    type: "meeting",
  },
  {
    date: new Date(2024, 1, 18),
    title: "Court Hearing - Johnson vs. Tech Corp",
    type: "hearing",
  },
  {
    date: new Date(2024, 1, 20),
    title: "Document Filing Deadline",
    type: "deadline",
  },
]

export function LawyerCalendar({ lawyerId }: LawyerCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  
  const today = new Date()
  const sixMonthsFromNow = addMonths(today, 6)

  // Get next 5 available dates (excluding weekends and existing appointments)
  const nextAvailableDates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  const handleScheduleConsultation = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and time")
      return
    }

    // In a real app, this would make an API call to schedule the consultation
    toast.success("Consultation scheduled successfully!")
    setSelectedDate(undefined)
    setSelectedTime(undefined)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Consultation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          fromDate={today}
          toDate={sixMonthsFromNow}
          className="rounded-md border"
        />

        {selectedDate && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Available Times for {format(selectedDate, "MMMM d, yyyy")}</h4>
            <div className="grid grid-cols-2 gap-2">
              {generateAvailableSlots(selectedDate).map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className="w-full"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Next Available Dates</h4>
          <div className="space-y-2">
            {nextAvailableDates.map((date, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border p-2 cursor-pointer hover:bg-accent"
                onClick={() => setSelectedDate(date)}
              >
                <span className="text-sm">{format(date, "EEEE, MMMM d")}</span>
                <Badge variant={isSameDay(date, selectedDate ?? new Date()) ? "default" : "outline"}>
                  {generateAvailableSlots(date).length} slots
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full mt-4" 
          onClick={handleScheduleConsultation}
          disabled={!selectedDate || !selectedTime}
        >
          Schedule Consultation
        </Button>

        <div className="space-y-4 mt-6">
          <h4 className="text-sm font-medium">Upcoming Events</h4>
          <div className="space-y-2">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex flex-col space-y-1 rounded-md border p-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{event.title}</span>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {event.date.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}