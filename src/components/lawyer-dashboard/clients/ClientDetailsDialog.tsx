import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2 } from "lucide-react"
import { EditClientDialog } from "./EditClientDialog"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ClientDetailsDialogProps {
  client: {
    id: string
    name: string
    email: string
    phone: string
    source: "marketplace" | "direct"
    activeCases: Array<{ id: string; title: string; type: string }>
    pastCases: Array<{ id: string; title: string; type: string }>
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClientDetailsDialog({
  client,
  open,
  onOpenChange,
}: ClientDetailsDialogProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)

  if (!client) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Client Details</DialogTitle>
              <Button variant="outline" size="icon" onClick={() => setShowEditDialog(true)}>
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{client.name}</h3>
                  <Badge variant={client.source === "marketplace" ? "default" : "secondary"}>
                    {client.source === "marketplace" ? "Marketplace" : "Direct"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{client.email}</p>
                <p className="text-sm text-muted-foreground">{client.phone}</p>
              </div>

              {client.activeCases.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Active Cases</h4>
                  <div className="grid gap-2">
                    {client.activeCases.map((c) => (
                      <div key={c.id} className="text-sm p-3 bg-muted rounded-lg">
                        <div className="flex justify-between">
                          <span>{c.title}</span>
                          <Badge variant="outline">{c.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {client.pastCases.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Past Cases</h4>
                  <div className="grid gap-2">
                    {client.pastCases.map((c) => (
                      <div key={c.id} className="text-sm p-3 bg-muted rounded-lg">
                        <div className="flex justify-between">
                          <span>{c.title}</span>
                          <Badge variant="outline">{c.type}</Badge>
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

      <EditClientDialog
        client={client}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  )
}