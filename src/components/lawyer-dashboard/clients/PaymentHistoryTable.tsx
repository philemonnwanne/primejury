import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockPaymentHistory = [
  {
    id: "1",
    date: "2024-03-15",
    amount: 5000,
    status: "completed",
    caseTitle: "Smith vs. Johnson",
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    date: "2024-03-01",
    amount: 3500,
    status: "completed",
    caseTitle: "Estate Planning - Brown",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "3",
    date: "2024-02-15",
    amount: 2500,
    status: "pending",
    caseTitle: "Corporate Merger - Tech Corp",
    paymentMethod: "Credit Card",
  },
]

export function PaymentHistoryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Case</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockPaymentHistory.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
            <TableCell>{payment.caseTitle}</TableCell>
            <TableCell>${payment.amount.toLocaleString()}</TableCell>
            <TableCell>{payment.paymentMethod}</TableCell>
            <TableCell>
              <Badge
                variant={payment.status === "completed" ? "default" : "secondary"}
              >
                {payment.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}