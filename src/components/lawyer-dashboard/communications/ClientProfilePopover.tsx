import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ClientProfileProps {
  client: {
    id: string
    name: string
    email: string
    phone: string
    address: string
    occupation: string
    cases: Array<{ id: string; title: string }>
  }
  children: React.ReactNode
}

export function ClientProfilePopover({ client, children }: ClientProfileProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>{client.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="text-sm font-medium">Email</div>
              <div className="text-sm text-muted-foreground">{client.email}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Phone</div>
              <div className="text-sm text-muted-foreground">{client.phone}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Address</div>
              <div className="text-sm text-muted-foreground">{client.address}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Occupation</div>
              <div className="text-sm text-muted-foreground">{client.occupation}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Cases</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {client.cases.map((c) => (
                  <Badge key={c.id} variant="secondary">
                    {c.title}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}