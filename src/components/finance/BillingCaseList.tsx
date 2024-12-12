import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, DollarSign, Send } from "lucide-react"

interface BillingCase {
  id: string
  title: string
  client: string
  paymentStructure: {
    type: "hourly" | "flat_fee" | "contingency" | "installments"
    details: string
  }
  totalAmount: number
  paidAmount: number
  nextPaymentDate?: string
  status: "current" | "late" | "upcoming" | "paid"
}

const mockCases: BillingCase[] = [
  {
    id: "1",
    title: "Smith vs. Johnson",
    client: "John Smith",
    paymentStructure: {
      type: "installments",
      details: "Monthly payments of $2,000"
    },
    totalAmount: 10000,
    paidAmount: 4000,
    nextPaymentDate: "2024-04-15",
    status: "current"
  },
  {
    id: "2",
    title: "Estate Planning - Brown",
    client: "Robert Brown",
    paymentStructure: {
      type: "flat_fee",
      details: "One-time payment"
    },
    totalAmount: 5000,
    paidAmount: 5000,
    status: "paid"
  },
  {
    id: "3",
    title: "Personal Injury Case",
    client: "Jane Doe",
    paymentStructure: {
      type: "contingency",
      details: "33% of settlement"
    },
    totalAmount: 0,
    paidAmount: 0,
    status: "upcoming"
  }
]

export function BillingCaseList() {
  const { toast } = useToast()

  const handlePaymentRequest = (caseId: string) => {
    toast({
      title: "Payment Request Sent",
      description: "The client has been notified of the payment request.",
    })
  }

  const handlePaymentReminder = (caseId: string) => {
    toast({
      title: "Payment Reminder Sent",
      description: "A payment reminder has been sent to the client.",
    })
  }

  const getStatusBadge = (status: BillingCase["status"]) => {
    const variants = {
      current: "default",
      late: "destructive",
      upcoming: "secondary",
      paid: "outline"
    } as const

    return <Badge variant={variants[status]}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Case Billing Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Payment Structure</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Next Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell className="font-medium">{case_.title}</TableCell>
                  <TableCell>{case_.client}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="secondary">
                        {case_.paymentStructure.type}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {case_.paymentStructure.details}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {case_.paymentStructure.type === "contingency" 
                      ? "TBD" 
                      : `$${case_.totalAmount.toLocaleString()}`}
                  </TableCell>
                  <TableCell>${case_.paidAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    {case_.nextPaymentDate 
                      ? new Date(case_.nextPaymentDate).toLocaleDateString() 
                      : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(case_.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePaymentRequest(case_.id)}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Request
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePaymentReminder(case_.id)}
                      >
                        <Bell className="h-4 w-4 mr-1" />
                        Remind
                      </Button>
                    </div>
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