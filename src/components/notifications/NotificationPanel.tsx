import { Bell, Calendar, MessageSquare, AlertTriangle, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"

const notifications = [
  {
    id: 1,
    title: "New Task Assigned",
    description: "You have been assigned to review Case #123",
    icon: Calendar,
    time: "5 minutes ago",
    read: false,
    priority: "medium",
  },
  {
    id: 2,
    title: "Deadline Approaching",
    description: "Case #456 filing deadline in 24 hours",
    icon: AlertTriangle,
    time: "1 hour ago",
    read: true,
    priority: "high",
  },
  {
    id: 3,
    title: "New Client Message",
    description: "John Doe sent a message regarding Case #789",
    icon: MessageSquare,
    time: "2 hours ago",
    read: false,
    priority: "low",
  },
]

const historicalNotifications = [
  {
    id: 4,
    title: "Document Reviewed",
    description: "Legal document review completed for Case #321",
    icon: MessageSquare,
    time: "2 days ago",
    read: true,
    priority: "low",
  },
  {
    id: 5,
    title: "Meeting Scheduled",
    description: "Client consultation scheduled for next week",
    icon: Calendar,
    time: "3 days ago",
    read: true,
    priority: "medium",
  },
]

export function NotificationPanel() {
  const [showHistory, setShowHistory] = useState(false)
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-blue-500"
      case "low":
        return "text-purple-500"
      default:
        return "text-gray-500"
    }
  }

  const getPriorityBgColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10"
      case "medium":
        return "bg-blue-500/10"
      case "low":
        return "bg-purple-500/10"
      default:
        return "bg-gray-500/10"
    }
  }

  const displayNotifications = showHistory 
    ? [...notifications, ...historicalNotifications]
    : notifications

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
        {displayNotifications.map((notification) => (
          <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
            <CardHeader className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-md ${getPriorityBgColor(notification.priority)}`}>
                  <notification.icon className={`h-4 w-4 ${getPriorityColor(notification.priority)}`} />
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

      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => setShowHistory(!showHistory)}
        className="flex items-center gap-1 w-full mt-4 justify-center"
      >
        <History className="h-4 w-4" />
        {showHistory ? "Hide History" : "Show History"}
      </Button>
    </div>
  )
}