import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, RefreshCw } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

const calendarServices = [
  {
    id: "google",
    name: "Google Calendar",
    connected: false,
    icon: Calendar,
  },
  {
    id: "outlook",
    name: "Outlook Calendar",
    connected: true,
    icon: Calendar,
  },
  {
    id: "apple",
    name: "Apple Calendar",
    connected: false,
    icon: Calendar,
  },
]

export function CalendarSync() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSync = (serviceId: string) => {
    toast({
      title: "Calendar Sync",
      description: `Syncing with ${
        calendarServices.find((service) => service.id === serviceId)?.name
      }...`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync Calendars
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calendar Synchronization</DialogTitle>
          <DialogDescription>
            Connect and sync with your other calendars
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {calendarServices.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <service.icon className="h-5 w-5" />
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.connected ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {service.connected && (
                  <Badge variant="secondary">Last synced: 2h ago</Badge>
                )}
                <Button
                  variant={service.connected ? "outline" : "default"}
                  onClick={() => handleSync(service.id)}
                >
                  {service.connected ? "Sync Now" : "Connect"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}