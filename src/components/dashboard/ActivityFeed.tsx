import { FileText, UserPlus, MessageSquare } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "document",
    description: "New document uploaded to Johnson Case",
    timestamp: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    type: "assignment",
    description: "Sarah Palmer assigned to Smith LLC Case",
    timestamp: "4 hours ago",
    icon: UserPlus,
  },
  {
    id: 3,
    type: "comment",
    description: "New comment on Davis Investigation",
    timestamp: "5 hours ago",
    icon: MessageSquare,
  },
]

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-4 rounded-lg border p-4"
        >
          <activity.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}