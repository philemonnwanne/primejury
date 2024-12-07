import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { CreditCard, AlertCircle, CheckCircle2 } from "lucide-react"

interface BillingSummary {
  nextPaymentDate: string
  nextPaymentAmount: number
  outstandingBalance: number
  recentPayments: {
    date: string
    amount: number
    status: "paid" | "pending" | "failed"
  }[]
}

const mockBillingData: BillingSummary = {
  nextPaymentDate: "2024-04-01",
  nextPaymentAmount: 2500,
  outstandingBalance: 5000,
  recentPayments: [
    {
      date: "2024-03-01",
      amount: 2000,
      status: "paid",
    },
    {
      date: "2024-02-01",
      amount: 1500,
      status: "paid",
    },
  ],
}

export function BillingOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Billing Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Next Payment Due</p>
            <p className="text-2xl font-bold">
              ${mockBillingData.nextPaymentAmount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Due on: {new Date(mockBillingData.nextPaymentDate).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-2 rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Outstanding Balance</p>
            <p className="text-2xl font-bold text-red-500">
              ${mockBillingData.outstandingBalance.toLocaleString()}
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/client-dashboard/billing">View Details</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Recent Payments</h4>
          {mockBillingData.recentPayments.map((payment, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <p className="font-medium">
                    ${payment.amount.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(payment.date).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                Paid
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}