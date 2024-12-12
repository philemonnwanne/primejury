import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Check, Info, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { TimelineEventDetails } from "./TimelineEventDetails"
import { useToast } from "@/hooks/use-toast"

interface TimelineEvent {
  date: string
  title: string
  description: string
  status: "completed" | "current" | "upcoming"
  details?: {
    lawyerNotes?: string
    evidenceRequests?: Array<{
      id: string
      description: string
      status: "pending" | "received" | "rejected"
      dueDate: string
    }>
    blockers?: Array<{
      id: string
      description: string
      severity: "low" | "medium" | "high"
      status: "active" | "resolved"
    }>
  }
}

interface CaseTimelineProps {
  events: TimelineEvent[]
  onUpdateEvent?: (updatedEvent: TimelineEvent, index: number) => void
  onAddEvent?: (newEvent: TimelineEvent) => void
}

export function CaseTimeline({ events, onUpdateEvent, onAddEvent }: CaseTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(-1)
  const { toast } = useToast()

  const handleEventUpdate = (updatedEvent: TimelineEvent) => {
    if (onUpdateEvent && selectedEventIndex !== -1) {
      onUpdateEvent(updatedEvent, selectedEventIndex)
      toast({
        title: "Timeline Updated",
        description: "The timeline event has been successfully updated.",
      })
    }
  }

  const handleAddEvent = () => {
    if (onAddEvent) {
      const newEvent: TimelineEvent = {
        date: new Date().toISOString().split('T')[0],
        title: "New Event",
        description: "Add description here",
        status: "upcoming",
      }
      onAddEvent(newEvent)
      toast({
        title: "Event Added",
        description: "A new timeline event has been added.",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Case Timeline</CardTitle>
        {onAddEvent && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddEvent}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0 pl-8 before:absolute before:left-8 before:top-0 before:h-full before:w-[2px] before:-translate-x-1/2 before:bg-primary/20">
          {events.map((event, index) => (
            <div key={index} className="relative pb-10 last:pb-0">
              <div
                className={cn(
                  "absolute left-0 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full shadow-md transition-colors duration-300",
                  event.status === "completed" && "bg-green-500",
                  event.status === "current" && "bg-primary animate-pulse",
                  event.status === "upcoming" && "bg-muted"
                )}
              >
                {event.status === "completed" ? (
                  <Check className="h-3 w-3 text-white" />
                ) : index === 0 ? (
                  <Calendar className="h-3 w-3 text-primary-foreground" />
                ) : (
                  <Clock className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "font-medium text-lg",
                      event.status === "current" && "text-primary font-semibold",
                      event.status === "upcoming" && "text-muted-foreground"
                    )}
                  >
                    {event.title}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      setSelectedEvent(event)
                      setSelectedEventIndex(index)
                    }}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  {index !== events.length - 1 && (
                    <div className="flex items-center text-muted-foreground">
                      <ArrowRight
                        className={cn(
                          "h-4 w-4",
                          event.status === "completed" && "text-green-500"
                        )}
                      />
                    </div>
                  )}
                </div>
                <p
                  className={cn(
                    "text-sm",
                    event.status === "upcoming"
                      ? "text-muted-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {event.description}
                </p>
                <p
                  className={cn(
                    "text-sm font-medium",
                    event.status === "completed" && "text-green-500",
                    event.status === "current" && "text-primary",
                    event.status === "upcoming" && "text-muted-foreground"
                  )}
                >
                  {event.date}
                </p>
              </div>
              {index !== events.length - 1 && (
                <div
                  className={cn(
                    "absolute left-[11px] top-6 h-[calc(100%-24px)] w-[2px] -translate-x-1/2 transition-colors duration-300",
                    event.status === "completed"
                      ? "bg-green-500"
                      : "bg-primary/20"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>

      {selectedEvent && (
        <TimelineEventDetails
          isOpen={!!selectedEvent}
          onOpenChange={(open) => !open && setSelectedEvent(null)}
          event={selectedEvent}
          onUpdate={handleEventUpdate}
        />
      )}
    </Card>
  )
}