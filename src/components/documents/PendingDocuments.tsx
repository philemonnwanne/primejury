import { AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PendingDocument {
  id: string
  title: string
  caseTitle: string
  dueDate: string
  status: "urgent" | "upcoming" | "overdue"
}

const mockPendingDocuments: PendingDocument[] = [
  {
    id: "1",
    title: "Signed Settlement Agreement",
    caseTitle: "Smith vs. Johnson",
    dueDate: "2024-03-25",
    status: "urgent"
  },
  {
    id: "2",
    title: "Property Deed Documentation",
    caseTitle: "Estate Planning - Brown",
    dueDate: "2024-04-01",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Insurance Policy Documents",
    caseTitle: "Personal Injury Case",
    dueDate: "2024-03-15",
    status: "overdue"
  }
]

export function PendingDocuments() {
  const getStatusColor = (status: PendingDocument["status"]) => {
    switch (status) {
      case "urgent":
        return "text-yellow-600 bg-yellow-50"
      case "overdue":
        return "text-red-600 bg-red-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          Pending Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockPendingDocuments.map((doc) => {
          const daysRemaining = getDaysRemaining(doc.dueDate)
          return (
            <div
              key={doc.id}
              className={cn(
                "flex items-center justify-between rounded-lg p-4",
                getStatusColor(doc.status)
              )}
            >
              <div className="space-y-1">
                <p className="font-medium">{doc.title}</p>
                <p className="text-sm text-muted-foreground">
                  Case: {doc.caseTitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {daysRemaining < 0
                    ? `${Math.abs(daysRemaining)} days overdue`
                    : daysRemaining === 0
                    ? "Due today"
                    : `${daysRemaining} days remaining`}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}