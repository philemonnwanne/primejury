import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface PaymentRequest {
  id: string
  caseTitle: string
  client: string
  amount: number
  dueDate: string
  status: "pending" | "sent" | "viewed" | "paid"
  reminders: number
}

const mockRequests: PaymentRequest[] = [
  {
    id: "1",
    caseTitle: "Smith vs. Johnson",
    client: "John Smith",
    amount: 2000,
    dueDate: "2024-04-15",
    status: "pending",
    reminders: 0
  },
  {
    id: "2",
    caseTitle: "Estate Planning - Brown",
    client: "Robert Brown",
    amount: 1500,
    dueDate: "2024-04-20",
    status: "sent",
    reminders: 1
  },
  {
    id: "3",
    caseTitle: "Personal Injury Case",
    client: "Jane Doe",
    amount: 3000,
    dueDate: "2024-04-10",
    status: "viewed",
    reminders: 2
  }
]

export function PaymentRequests() {
  const { toast } = useToast()

  const handleSendReminder = (requestId: string) => {
    toast({
      title: "Reminder Sent",
      description: "Payment reminder has been sent to the client.",
    })
  }

  const getStatusBadge = (status: PaymentRequest["status"]) => {
    const variants = {
      pending: "secondary",
      sent: "default",
      viewed: "outline",
      paid: "secondary"
    } as const

    return <Badge variant={variants[status]}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reminders Sent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.caseTitle}</TableCell>
                  <TableCell>{request.client}</TableCell>
                  <TableCell>${request.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(request.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{request.reminders}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendReminder(request.id)}
                      disabled={request.status === "paid"}
                    >
                      Send Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}