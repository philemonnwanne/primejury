import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface UrgentItem {
  id: string
  title: string
  type: "form" | "case" | "document"
  dueDate: string
  priority: "high" | "medium" | "low"
}

const mockUrgentItems: UrgentItem[] = [
  {
    id: "1",
    title: "Settlement Agreement Form",
    type: "form",
    dueDate: "2024-03-25",
    priority: "high",
  },
  {
    id: "2",
    title: "Property Case Update",
    type: "case",
    dueDate: "2024-03-20",
    priority: "high",
  },
  {
    id: "3",
    title: "Insurance Documentation",
    type: "document",
    dueDate: "2024-03-22",
    priority: "medium",
  },
]

export function UrgentNotifications() {
  const getTypeDetails = (type: UrgentItem["type"]) => {
    switch (type) {
      case "form":
        return {
          icon: FileText,
          route: "/client-dashboard/forms",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          pulseColor: "bg-yellow-500",
        }
      case "case":
        return {
          icon: AlertTriangle,
          route: "/client-dashboard/cases",
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          pulseColor: "bg-red-500",
        }
      case "document":
        return {
          icon: Clock,
          route: "/client-dashboard/documents",
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          pulseColor: "bg-blue-500",
        }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Urgent Attention Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockUrgentItems.map((item) => {
          const typeDetails = getTypeDetails(item.type)
          return (
            <div
              key={item.id}
              className={`relative flex items-center justify-between rounded-lg p-4 ${typeDetails.bgColor}`}
            >
              {/* Pulsing Beacon */}
              <div className="absolute right-2 top-2">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${typeDetails.pulseColor} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${typeDetails.pulseColor}`}></span>
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <typeDetails.icon className={`h-4 w-4 ${typeDetails.color}`} />
                  <p className="font-medium">{item.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Due: {new Date(item.dueDate).toLocaleDateString()}
                </p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className={`${typeDetails.color} hover:${typeDetails.bgColor}`}
                asChild
              >
                <Link to={typeDetails.route}>View Details</Link>
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}