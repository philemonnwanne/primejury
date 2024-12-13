import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Calendar, Briefcase } from "lucide-react"
import { useClientData } from "@/hooks/useClientData"

interface ClientListProps {
  onSelectClient: (clientId: string) => void
}

export function ClientList({ onSelectClient }: ClientListProps) {
  const { clients } = useClientData()
  
  const activeClients = clients.filter(client => client.activeCases.length > 0)
  const pastClients = clients.filter(client => client.activeCases.length === 0 && client.pastCases.length > 0)

  const ClientCard = ({ client }: { client: any }) => (
    <Card
      key={client.id}
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onSelectClient(client.id)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">{client.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{client.email}</p>
        </div>
        <Badge variant={client.source === "marketplace" ? "default" : "secondary"}>
          {client.source === "marketplace" ? "Marketplace" : "Direct"}
        </Badge>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span>{client.activeCases.length} Active Cases</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Client since {new Date(client.joinDate).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  )

  return (
    <Tabs defaultValue="active" className="space-y-4">
      <TabsList>
        <TabsTrigger value="active">Active Clients ({activeClients.length})</TabsTrigger>
        <TabsTrigger value="past">Past Clients ({pastClients.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="space-y-4">
        {activeClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </TabsContent>
      <TabsContent value="past" className="space-y-4">
        {pastClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </TabsContent>
    </Tabs>
  )
}