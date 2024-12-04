import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ClientDashboardHeader() {
  const { toast } = useToast()

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "Notification feature coming soon",
    })
  }

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Client Dashboard</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNotificationClick}
        >
          Notifications
        </Button>
      </div>
    </header>
  )
}