import { Bell, Calendar, MessageSquare, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const notifications = [
  {
    id: 1,
    title: "New Task Assigned",
    description: "You have been assigned to review Case #123",
    icon: Calendar,
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Deadline Approaching",
    description: "Case #456 filing deadline in 24 hours",
    icon: AlertTriangle,
    time: "1 hour ago",
    read: true,
  },
  {
    id: 3,
    title: "New Client Message",
    description: "John Doe sent a message regarding Case #789",
    icon: MessageSquare,
    time: "2 hours ago",
    read: false,
  },
]

export function NotificationPanel() {
  return (
    <div className="w-full max-w-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        <Button variant="ghost" size="sm">
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
            <CardHeader className="p-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-md">
                  <notification.icon className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">
                    {notification.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {notification.time}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}