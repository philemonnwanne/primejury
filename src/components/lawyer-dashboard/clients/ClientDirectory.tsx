import { useState } from "react"
import { ClientList } from "./ClientList"
import { ClientDetails } from "./ClientDetails"
import { AddClientDialog } from "./AddClientDialog"
import { Button } from "@/components/ui/button"
import { UserPlus, Import } from "lucide-react"
import { ImportClientsDialog } from "./ImportClientsDialog"

export function ClientDirectory() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)

  return (
    <div className="space-y-6">
      {!selectedClientId ? (
        <>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Client Directory</h2>
              <p className="text-sm text-muted-foreground">
                Manage your clients and their cases
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowAddDialog(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
              <Button variant="outline" onClick={() => setShowImportDialog(true)}>
                <Import className="h-4 w-4 mr-2" />
                Import from Marketplace
              </Button>
            </div>
          </div>
          <ClientList onSelectClient={setSelectedClientId} />
        </>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedClientId(null)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to directory
          </button>
          <ClientDetails clientId={selectedClientId} />
        </div>
      )}

      <AddClientDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      <ImportClientsDialog open={showImportDialog} onOpenChange={setShowImportDialog} />
    </div>
  )
}