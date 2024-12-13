import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { User, Calendar } from "lucide-react"

interface ImportClientsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImportClientsDialog({ open, onOpenChange }: ImportClientsDialogProps) {
  const handleImport = (clientId: string) => {
    // Here you would typically make an API call to import the client
    toast.success("Client imported successfully")
    onOpenChange(false)
  }

  // This would typically come from your marketplace data
  const importableClients = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      caseTitle: "Contract Dispute Resolution",
      bidDate: "2024-03-15",
    },
    // Add more clients as needed
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Clients from Marketplace</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {importableClients.map((client) => (
            <Card key={client.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">{client.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Bid won: {new Date(client.bidDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button onClick={() => handleImport(client.id)}>Import</Button>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}