import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"

const mockUnreadMessages = [
  {
    id: "1",
    sender: "John Smith",
    preview: "Regarding case #123...",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    sender: "Sarah Johnson",
    preview: "Update on settlement...",
    timestamp: "9:15 AM",
  },
  {
    id: "3",
    sender: "Michael Brown",
    preview: "Question about hearing...",
    timestamp: "Yesterday",
  },
]

export function UnreadMessages() {
  return (
    <Card className="col-span-full md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Unread Messages ({mockUnreadMessages.length})
        </CardTitle>
        <Button asChild variant="outline">
          <Link to="/lawyer-dashboard/messages">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockUnreadMessages.map((message) => (
            <div
              key={message.id}
              className="flex flex-col space-y-1 rounded-lg border p-4 hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{message.sender}</span>
                <span className="text-sm text-muted-foreground">
                  {message.timestamp}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {message.preview}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}