import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockClients } from "./mockData"

interface ClientListProps {
  filter: "active" | "past" | "all"
  searchQuery: string
}

export function ClientList({ filter, searchQuery }: ClientListProps) {
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === "active") {
      return matchesSearch && client.activeCases.length > 0
    }
    if (filter === "past") {
      return matchesSearch && client.pastCases.length > 0
    }
    return matchesSearch
  })

  return (
    <ScrollArea className="h-[600px]">
      <div className="grid gap-4 p-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{client.name}</h3>
                  <Badge variant={client.source === "marketplace" ? "default" : "secondary"}>
                    {client.source === "marketplace" ? "Marketplace" : "Direct"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{client.email}</p>
                <p className="text-sm text-muted-foreground">{client.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  Active Cases: {client.activeCases.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Past Cases: {client.pastCases.length}
                </p>
              </div>
            </div>
            
            {client.activeCases.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Active Cases</h4>
                <div className="grid gap-2">
                  {client.activeCases.map((c) => (
                    <div key={c.id} className="text-sm p-2 bg-muted rounded-md">
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
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Past Cases</h4>
                <div className="grid gap-2">
                  {client.pastCases.map((c) => (
                    <div key={c.id} className="text-sm p-2 bg-muted rounded-md">
                      <div className="flex justify-between">
                        <span>{c.title}</span>
                        <Badge variant="outline">{c.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}