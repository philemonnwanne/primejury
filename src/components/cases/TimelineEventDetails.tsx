import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Edit2, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

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
  onUpdate?: (updatedEvent: any) => void
}

export function TimelineEventDetails({
  isOpen,
  onOpenChange,
  event,
  onUpdate,
}: TimelineEventDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedEvent, setEditedEvent] = useState(event)
  const { toast } = useToast()

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedEvent)
      toast({
        title: "Event Updated",
        description: "Timeline event has been successfully updated.",
      })
    }
    setIsEditing(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            {isEditing ? (
              <Input
                value={editedEvent.title}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, title: e.target.value })
                }
                className="text-lg font-semibold"
              />
            ) : (
              <DialogTitle>{event.title}</DialogTitle>
            )}
            <div className="flex gap-2">
              {isEditing ? (
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
          <DialogDescription>
            {isEditing ? (
              <Input
                type="date"
                value={editedEvent.date}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, date: e.target.value })
                }
              />
            ) : (
              `${event.date} - ${event.status}`
            )}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              {isEditing ? (
                <Textarea
                  value={editedEvent.description}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-muted-foreground">{event.description}</p>
              )}
            </div>

            {(event.details?.lawyerNotes || isEditing) && (
              <div>
                <h3 className="font-semibold mb-2">Lawyer's Notes</h3>
                {isEditing ? (
                  <Textarea
                    value={editedEvent.details?.lawyerNotes || ""}
                    onChange={(e) =>
                      setEditedEvent({
                        ...editedEvent,
                        details: {
                          ...editedEvent.details,
                          lawyerNotes: e.target.value,
                        },
                      })
                    }
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-muted-foreground whitespace-pre-line">
                    {event.details?.lawyerNotes}
                  </p>
                )}
              </div>
            )}

            {event.details?.evidenceRequests &&
              event.details.evidenceRequests.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Evidence Requests</h3>
                  <div className="space-y-3">
                    {event.details.evidenceRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          {isEditing ? (
                            <Input
                              value={request.description}
                              onChange={(e) => {
                                const updatedRequests =
                                  editedEvent.details?.evidenceRequests?.map(
                                    (r) =>
                                      r.id === request.id
                                        ? {
                                            ...r,
                                            description: e.target.value,
                                          }
                                        : r
                                  )
                                setEditedEvent({
                                  ...editedEvent,
                                  details: {
                                    ...editedEvent.details,
                                    evidenceRequests: updatedRequests,
                                  },
                                })
                              }}
                            />
                          ) : (
                            <p className="font-medium">{request.description}</p>
                          )}
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
                          {isEditing ? (
                            <Input
                              value={blocker.description}
                              onChange={(e) => {
                                const updatedBlockers =
                                  editedEvent.details?.blockers?.map((b) =>
                                    b.id === blocker.id
                                      ? {
                                          ...b,
                                          description: e.target.value,
                                        }
                                      : b
                                  )
                                setEditedEvent({
                                  ...editedEvent,
                                  details: {
                                    ...editedEvent.details,
                                    blockers: updatedBlockers,
                                  },
                                })
                              }}
                            />
                          ) : (
                            <p className="font-medium">{blocker.description}</p>
                          )}
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