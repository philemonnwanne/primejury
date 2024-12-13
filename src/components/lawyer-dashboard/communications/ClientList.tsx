import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Client {
  id: string
  name: string
  cases: Array<{ id: string; title: string }>
  status: string
}

interface ClientListProps {
  clients: Client[]
  selectedClient?: string
  onSelectClient: (clientId: string) => void
}

export function ClientList({ clients, selectedClient, onSelectClient }: ClientListProps) {
  return (
    <ScrollArea className="h-[500px]">
      <div className="p-4 space-y-2">
        {clients.map((client) => (
          <div
            key={client.id}
            className={cn(
              "p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors",
              selectedClient === client.id && "bg-accent"
            )}
            onClick={() => onSelectClient(client.id)}
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium">{client.name}</span>
              <div className="flex flex-wrap gap-1">
                {client.cases.map((c, index) => (
                  <Badge 
                    key={c.id} 
                    variant="outline" 
                    className="text-xs"
                  >
                    {c.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}