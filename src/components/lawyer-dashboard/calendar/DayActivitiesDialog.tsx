import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { CalendarEvent } from "@/types/calendar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { QuickScheduleForm } from "./QuickScheduleForm"

interface DayActivitiesDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  date: Date
  events: CalendarEvent[]
  workingHours: { start: string; end: string }
  onEventScheduled: (event: CalendarEvent) => void
}

export function DayActivitiesDialog({
  isOpen,
  onOpenChange,
  date,
  events,
  workingHours,
  onEventScheduled,
}: DayActivitiesDialogProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ start: Date; end: Date } | null>(null)
  const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime())

  const workStart = new Date(date)
  workStart.setHours(parseInt(workingHours.start.split(":")[0]), parseInt(workingHours.start.split(":")[1]), 0)
  
  const workEnd = new Date(date)
  workEnd.setHours(parseInt(workingHours.end.split(":")[0]), parseInt(workingHours.end.split(":")[1]), 0)

  const availableSlots = []
  let currentTime = workStart

  for (let i = 0; i < sortedEvents.length; i++) {
    if (currentTime < sortedEvents[i].start) {
      availableSlots.push({
        start: new Date(currentTime),
        end: new Date(sortedEvents[i].start),
      })
    }
    currentTime = new Date(sortedEvents[i].end)
  }

  if (currentTime < workEnd) {
    availableSlots.push({
      start: new Date(currentTime),
      end: new Date(workEnd),
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Activities for {format(date, "MMMM d, yyyy")}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <div className="space-y-6 p-4">
            <div>
              <h3 className="font-semibold mb-3">Scheduled Events</h3>
              <div className="space-y-3">
                {sortedEvents.length > 0 ? (
                  sortedEvents.map((event) => (
                    <Card key={event.id} className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant={event.type === "deadline" ? "destructive" : "secondary"}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
                      </p>
                      {event.description && (
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      )}
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No events scheduled for this day</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Available Time Slots</h3>
              <div className="space-y-2">
                {availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`time-slot ${
                      selectedTimeSlot === slot ? "border-primary bg-accent/50" : ""
                    }`}
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    <span className="text-sm text-muted-foreground">
                      {format(slot.start, "h:mm a")} - {format(slot.end, "h:mm a")}
                    </span>
                    {selectedTimeSlot === slot && (
                      <QuickScheduleForm
                        timeSlot={slot}
                        onSchedule={(event) => {
                          onEventScheduled(event)
                          setSelectedTimeSlot(null)
                        }}
                        onCancel={() => setSelectedTimeSlot(null)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}