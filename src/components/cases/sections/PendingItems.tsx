import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Upload, DollarSign } from "lucide-react"
import { Link } from "react-router-dom"

interface PendingItem {
  id: string
  type: "form" | "document" | "payment"
  title: string
  caseTitle: string
  dueDate: string
  amount?: string
  status: "urgent" | "upcoming" | "overdue"
}

const mockPendingItems: PendingItem[] = [
  {
    id: "1",
    type: "form",
    title: "Settlement Agreement Form",
    caseTitle: "Smith vs. Johnson",
    dueDate: "2024-03-25",
    status: "urgent"
  },
  {
    id: "2",
    type: "document",
    title: "Insurance Documentation",
    caseTitle: "Smith vs. Johnson",
    dueDate: "2024-03-22",
    status: "upcoming"
  },
  {
    id: "3",
    type: "payment",
    title: "Filing Fee Payment",
    caseTitle: "Smith vs. Johnson",
    dueDate: "2024-03-20",
    amount: "$350.00",
    status: "overdue"
  }
]

export function PendingItems() {
  const getStatusColor = (status: PendingItem["status"]) => {
    switch (status) {
      case "urgent":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-blue-100 text-blue-800 border-blue-300"
    }
  }

  const getIcon = (type: PendingItem["type"]) => {
    switch (type) {
      case "form":
        return <FileText className="h-4 w-4" />
      case "document":
        return <Upload className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getActionLink = (type: PendingItem["type"]) => {
    switch (type) {
      case "form":
        return "/client-dashboard/forms"
      case "document":
        return "/client-dashboard/documents"
      case "payment":
        return "/client-dashboard/billing"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Pending Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockPendingItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${getStatusColor(item.status)}`}>
                {getIcon(item.type)}
              </div>
              <div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Due: {new Date(item.dueDate).toLocaleDateString()}
                </p>
                {item.amount && (
                  <p className="text-sm font-medium">Amount: {item.amount}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <Link to={getActionLink(item.type)}>Take Action</Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}