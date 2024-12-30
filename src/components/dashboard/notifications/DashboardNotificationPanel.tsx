import { Bell, Calendar, MessageSquare, AlertTriangle, History, FileText, Gavel, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"

interface DashboardNotification {
  id: string
  title: string
  description: string
  timestamp: string
  type: "case" | "document" | "meeting" | "message" | "bid" | "staff"
  priority: "high" | "medium" | "low"
  read: boolean
}

const notifications: DashboardNotification[] = [
  {
    id: "1",
    title: "New Case Assignment",
    description: "Case #789 has been assigned to John Doe",
    timestamp: "10 minutes ago",
    type: "case",
    priority: "high",
    read: false
  },
  {
    id: "2",
    title: "Staff Update",
    description: "New lawyer Jane Smith joined the firm",
    timestamp: "1 hour ago",
    type: "staff",
    priority: "medium",
    read: false
  },
  {
    id: "3",
    title: "Document Review Required",
    description: "Multiple case documents pending review",
    timestamp: "2 hours ago",
    type: "document",
    priority: "high",
    read: false
  }
]

const historicalNotifications: DashboardNotification[] = [
  {
    id: "4",
    title: "Performance Review",
    description: "Monthly performance metrics are ready",
    timestamp: "2 days ago",
    type: "staff",
    priority: "low",
    read: true
  },
  {
    id: "5",
    title: "New Case Bid",
    description: "Firm received new case bid opportunity",
    timestamp: "3 days ago",
    type: "bid",
    priority: "medium",
    read: true
  }
]

export function DashboardNotificationPanel() {
  const [showHistory, setShowHistory] = useState(false)
  
  const getTypeIcon = (type: DashboardNotification["type"]) => {
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
      case "staff":
        return Users
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