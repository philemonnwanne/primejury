import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface ImportClientsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockMarketplaceClients = [
  {
    id: "mp1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    caseTitle: "Contract Dispute",
    bidAmount: "$5,000",
    status: "Won",
  },
  {
    id: "mp2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    caseTitle: "IP Rights Case",
    bidAmount: "$7,500",
    status: "Won",
  },
]

export function ImportClientsDialog({ open, onOpenChange }: ImportClientsDialogProps) {
  const handleImport = (clientId: string) => {
    toast.success("Client imported successfully")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Clients from Marketplace</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] mt-4">
          <div className="space-y-4">
            {mockMarketplaceClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{client.name}</h3>
                    <Badge>Won Bid</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                  <p className="text-sm">
                    Case: {client.caseTitle} - {client.bidAmount}
                  </p>
                </div>
                <Button onClick={() => handleImport(client.id)}>Import</Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}