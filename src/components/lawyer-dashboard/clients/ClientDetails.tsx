import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react"
import { useClientData } from "@/hooks/useClientData"

interface ClientDetailsProps {
  clientId: string
}

export function ClientDetails({ clientId }: ClientDetailsProps) {
  const { getClientById } = useClientData()
  const client = getClientById(clientId)

  if (!client) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{client.name}</CardTitle>
            <Badge variant={client.source === "marketplace" ? "default" : "secondary"}>
              {client.source === "marketplace" ? "Marketplace" : "Direct"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{client.address}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Client since {new Date(client.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{client.activeCases.length} Active Cases</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Cases ({client.activeCases.length})</TabsTrigger>
          <TabsTrigger value="past">Past Cases ({client.pastCases.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="space-y-4">
            {client.activeCases.map(caseItem => (
              <Card key={caseItem.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{caseItem.title}</h3>
                    <Badge>{caseItem.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>Filed: {new Date(caseItem.filingDate).toLocaleDateString()}</span>
                    <span>Type: {caseItem.type}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="space-y-4">
            {client.pastCases.map(caseItem => (
              <Card key={caseItem.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{caseItem.title}</h3>
                    <Badge variant="outline">{caseItem.outcome}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>Closed: {new Date(caseItem.closingDate).toLocaleDateString()}</span>
                    <span>Duration: {caseItem.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}