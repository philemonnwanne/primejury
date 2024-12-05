import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { addMonths, format, isSameDay } from "date-fns"
import { toast } from "sonner"

const availableTimeSlots = {
  "2024-02-15": ["09:00", "10:00", "14:00", "15:00", "16:00"],
  "2024-02-18": ["11:00", "13:00", "14:00"],
  "2024-02-20": ["09:00", "10:00", "11:00", "15:00"],
  "2024-02-22": ["13:00", "14:00", "16:00"],
  "2024-02-25": ["10:00", "11:00", "15:00", "16:00"],
}

interface LawyerCalendarProps {
  lawyerId: string;
}

export function LawyerCalendar({ lawyerId }: LawyerCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  
  const today = new Date()
  const sixMonthsFromNow = addMonths(today, 6)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime(undefined)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleScheduleConsultation = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and time for your consultation")
      return
    }

    toast.success("Consultation scheduled successfully!", {
      description: `Your consultation is scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}`
    })
  }

  const getAvailableTimesForDate = (date: Date): string[] => {
    const dateKey = format(date, "yyyy-MM-dd")
    return availableTimeSlots[dateKey] || []
  }

  const nextAvailableDates = Object.keys(availableTimeSlots).slice(0, 5)

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Schedule a Consultation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          fromDate={today}
          toDate={sixMonthsFromNow}
          className="rounded-md border"
        />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Next Available Dates:</h4>
            <div className="space-y-2">
              {nextAvailableDates.map((dateStr) => {
                const date = new Date(dateStr)
                return (
                  <div
                    key={dateStr}
                    className="flex items-center justify-between p-2 rounded-md border"
                  >
                    <span className="text-sm">{format(date, "MMMM d, yyyy")}</span>
                    <Badge variant="outline">
                      {availableTimeSlots[dateStr].length} slots available
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>

          {selectedDate && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Available Times for {format(selectedDate, "MMMM d, yyyy")}:</h4>
              <div className="grid grid-cols-3 gap-2">
                {getAvailableTimesForDate(selectedDate).map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="w-full"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Button 
            className="w-full mt-4" 
            onClick={handleScheduleConsultation}
            disabled={!selectedDate || !selectedTime}
          >
            Schedule Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}