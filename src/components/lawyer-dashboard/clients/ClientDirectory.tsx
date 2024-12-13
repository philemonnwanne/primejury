import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientList } from "./ClientList"
import { AddClientDialog } from "./AddClientDialog"
import { ImportClientsDialog } from "./ImportClientsDialog"
import { UserPlus, Import } from "lucide-react"

export function ClientDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAddDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
          <Button variant="outline" onClick={() => setShowImportDialog(true)}>
            <Import className="mr-2 h-4 w-4" />
            Import from Marketplace
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Cases</TabsTrigger>
          <TabsTrigger value="past">Past Cases</TabsTrigger>
          <TabsTrigger value="all">All Clients</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ClientList filter="active" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="past">
          <ClientList filter="past" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="all">
          <ClientList filter="all" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>

      <AddClientDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      <ImportClientsDialog open={showImportDialog} onOpenChange={setShowImportDialog} />
    </div>
  )
}