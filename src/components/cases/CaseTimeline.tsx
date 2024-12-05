import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight } from "lucide-react"

interface TimelineEvent {
  date: string
  title: string
  description: string
}

interface CaseTimelineProps {
  events: TimelineEvent[]
}

export function CaseTimeline({ events }: CaseTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Case Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0 pl-8 before:absolute before:left-8 before:top-0 before:h-full before:w-[2px] before:-translate-x-1/2 before:bg-primary/20">
          {events.map((event, index) => (
            <div key={index} className="relative pb-10 last:pb-0">
              <div className="absolute left-0 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary shadow-md">
                {index === 0 ? (
                  <Calendar className="h-3 w-3 text-primary-foreground" />
                ) : (
                  <Clock className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-lg">{event.title}</p>
                  {index !== events.length - 1 && (
                    <div className="flex items-center text-muted-foreground">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <p className="text-sm font-medium text-primary">{event.date}</p>
              </div>
              {index !== events.length - 1 && (
                <div className="absolute left-[11px] top-6 h-[calc(100%-24px)] w-[2px] -translate-x-1/2 bg-primary/20" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}