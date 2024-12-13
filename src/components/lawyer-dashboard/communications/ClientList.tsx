import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ClientProfilePopover } from "./ClientProfilePopover"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  occupation: string
  cases: Array<{ id: string; title: string }>
}

interface ClientListProps {
  clients: Client[]
  selectedClient?: string
  onSelectClient: (clientId: string) => void
}

export function ClientList({ clients, selectedClient, onSelectClient }: ClientListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="px-4">
        <Input
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <ScrollArea className="h-[450px]">
        <div className="p-4 space-y-2">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className={cn(
                "p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors",
                selectedClient === client.id && "bg-accent"
              )}
              onClick={() => onSelectClient(client.id)}
            >
              <ClientProfilePopover client={client}>
                <span className="font-medium hover:underline cursor-pointer">
                  {client.name}
                </span>
              </ClientProfilePopover>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}