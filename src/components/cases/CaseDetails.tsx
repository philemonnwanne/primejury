import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Clock } from "lucide-react"

interface CaseDetailsProps {
  caseId: string
}

export function CaseDetails({ caseId }: CaseDetailsProps) {
  // Mock data - in a real app, this would be fetched based on the caseId
  const caseDetails = {
    title: "Smith vs. Johnson",
    type: "Civil Litigation",
    client: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
    },
    lawyer: "Sarah Parker",
    status: "active",
    priority: "high",
    filingDate: "2024-01-15",
    nextHearing: "2024-03-20",
    description: "Contract dispute regarding construction project delays.",
    tasks: [
      { id: "1", title: "File Motion", deadline: "2024-03-01", status: "pending" },
      { id: "2", title: "Client Meeting", deadline: "2024-02-25", status: "completed" },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{caseDetails.title}</h2>
        <p className="text-muted-foreground">{caseDetails.type}</p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{caseDetails.client.name}</span>
          </div>
          <div>{caseDetails.client.email}</div>
          <div>{caseDetails.client.phone}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Dates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Filing Date</span>
            </div>
            <span>{caseDetails.filingDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Next Hearing</span>
            </div>
            <span>{caseDetails.nextHearing}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Associated tasks and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {caseDetails.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Due: {task.deadline}
                  </p>
                </div>
                <Badge
                  variant={task.status === "completed" ? "secondary" : "default"}
                >
                  {task.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}