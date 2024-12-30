import { Bell, Calendar, MessageSquare, AlertTriangle, History, FileText, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  description: string
  timestamp: string
  type: "case" | "document" | "meeting" | "message" | "bid"
  priority: "high" | "medium" | "low"
  read: boolean
  clientId?: string // Added to filter notifications per client
}

// Mock notifications - in a real app, these would come from an API with proper filtering
const notifications: Notification[] = [
  {
    id: "1",
    title: "Case Update",
    description: "Your case #456 has been updated with new documents",
    timestamp: "10 minutes ago",
    type: "case",
    priority: "high",
    read: false,
    clientId: "client123"
  },
  {
    id: "2",
    title: "Document Review Required",
    description: "Please review and sign the settlement agreement",
    timestamp: "1 hour ago",
    type: "document",
    priority: "high",
    read: false,
    clientId: "client123"
  },
  {
    id: "3",
    title: "Meeting Scheduled",
    description: "Consultation scheduled with Atty. Smith for tomorrow",
    timestamp: "2 hours ago",
    type: "meeting",
    priority: "medium",
    read: false,
    clientId: "client123"
  }
]

const historicalNotifications: Notification[] = [
  {
    id: "4",
    title: "Case Status",
    description: "Case #123 documents have been filed successfully",
    timestamp: "2 days ago",
    type: "case",
    priority: "low",
    read: true,
    clientId: "client123"
  },
  {
    id: "5",
    title: "New Bid Received",
    description: "You have received a new bid for your case",
    timestamp: "3 days ago",
    type: "bid",
    priority: "medium",
    read: true,
    clientId: "client123"
  }
]

interface NotificationPanelProps {
  clientId?: string // Optional prop to filter notifications for specific client
}

export function NotificationPanel({ clientId }: NotificationPanelProps) {
  const [showHistory, setShowHistory] = useState(false)
  
  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "case":
        return AlertTriangle
      case "document":
        return FileText
      case "meeting":
        return Calendar
      case "message":
        return MessageSquare
      case "bid":
        return Gavel
    }
  }

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

  // Filter notifications based on clientId if provided
  const filteredNotifications = clientId
    ? notifications.filter(n => n.clientId === clientId)
    : notifications

  const filteredHistoricalNotifications = clientId
    ? historicalNotifications.filter(n => n.clientId === clientId)
    : historicalNotifications

  const displayNotifications = showHistory 
    ? [...filteredNotifications, ...filteredHistoricalNotifications]
    : filteredNotifications

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
        {displayNotifications.map((notification) => {
          const Icon = getTypeIcon(notification.type)
          return (
            <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
              <CardHeader className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-md ${getPriorityBgColor(notification.priority)}`}>
                    <Icon className={`h-4 w-4 ${getPriorityColor(notification.priority)}`} />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {notification.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
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