import { Bell, History, AlertTriangle, Calendar, MessageSquare, FileText, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface LawyerNotification {
  id: string
  title: string
  description: string
  timestamp: string
  type: "case" | "document" | "meeting" | "message" | "bid"
  priority: "high" | "medium" | "low"
  read: boolean
}

const notifications: LawyerNotification[] = [
  {
    id: "1",
    title: "New Case Assignment",
    description: "You have been assigned to Case #789 - Property Dispute",
    timestamp: "10 minutes ago",
    type: "case",
    priority: "high",
    read: false
  },
  {
    id: "2",
    title: "Document Review Required",
    description: "Settlement agreement for Case #456 needs review",
    timestamp: "1 hour ago",
    type: "document",
    priority: "high",
    read: false
  },
  {
    id: "3",
    title: "Client Meeting Scheduled",
    description: "Meeting with John Doe at 2:00 PM",
    timestamp: "2 hours ago",
    type: "meeting",
    priority: "medium",
    read: false
  }
]

const historicalNotifications: LawyerNotification[] = [
  {
    id: "4",
    title: "Case Update",
    description: "Case #123 status updated to 'In Progress'",
    timestamp: "2 days ago",
    type: "case",
    priority: "low",
    read: true
  },
  {
    id: "5",
    title: "New Case Bid",
    description: "New bid opportunity for corporate law case",
    timestamp: "3 days ago",
    type: "bid",
    priority: "medium",
    read: true
  }
]

export function LawyerNotificationPanel() {
  const [showHistory, setShowHistory] = useState(false)

  const getTypeIcon = (type: LawyerNotification["type"]) => {
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

  const getPriorityColor = (priority: LawyerNotification["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-500/10"
      case "medium":
        return "text-blue-500 bg-blue-500/10"
      case "low":
        return "text-purple-500 bg-purple-500/10"
    }
  }

  const displayNotifications = showHistory 
    ? [...notifications, ...historicalNotifications]
    : notifications

  return (
    <div className="p-4">
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
          const priorityColor = getPriorityColor(notification.priority)
          
          return (
            <Card
              key={notification.id}
              className={`p-4 ${notification.read ? 'opacity-60' : ''}`}
            >
              <div className="flex gap-4">
                <div className={`p-2 rounded-lg ${priorityColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
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