import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LawyerCalendarProps {
  lawyerId: string
}

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM"
]

export function LawyerCalendar({ lawyerId }: LawyerCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState("")

  const handleScheduleAppointment = () => {
    if (!selectedDate || !selectedTime) {
      return
    }
    // Handle appointment scheduling
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Times</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedDate && (
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button 
            className="w-full" 
            onClick={handleScheduleAppointment}
            disabled={!selectedDate || !selectedTime}
          >
            Schedule Appointment
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}