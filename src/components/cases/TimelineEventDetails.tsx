import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface TimelineEventDetailsProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  event: {
    title: string
    date: string
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
}

export function TimelineEventDetails({
  isOpen,
  onOpenChange,
  event,
}: TimelineEventDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            {event.date} - {event.status}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>

            {event.details?.lawyerNotes && (
              <div>
                <h3 className="font-semibold mb-2">Lawyer's Notes</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {event.details.lawyerNotes}
                </p>
              </div>
            )}

            {event.details?.evidenceRequests && event.details.evidenceRequests.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Evidence Requests</h3>
                <div className="space-y-3">
                  {event.details.evidenceRequests.map((request) => (
                    <div
                      key={request.id}
                      className="border rounded-lg p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{request.description}</p>
                        <Badge
                          variant={
                            request.status === "received"
                              ? "default"
                              : request.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Due: {request.dueDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.details?.blockers && event.details.blockers.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Blockers</h3>
                <div className="space-y-3">
                  {event.details.blockers.map((blocker) => (
                    <div
                      key={blocker.id}
                      className="border rounded-lg p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {blocker.status === "active" ? (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                          <p className="font-medium">{blocker.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              blocker.severity === "high"
                                ? "destructive"
                                : blocker.severity === "medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {blocker.severity}
                          </Badge>
                          <Badge
                            variant={
                              blocker.status === "active"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {blocker.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}