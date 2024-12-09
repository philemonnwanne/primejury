import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

const billingData = {
  totalBilled: 450000,
  totalPaid: 380000,
  totalUnpaid: 70000,
  recentInvoices: [
    { id: "1", amount: 15000, status: "paid", date: "2024-03-15" },
    { id: "2", amount: 12000, status: "pending", date: "2024-03-14" },
    { id: "3", amount: 8000, status: "unpaid", date: "2024-03-13" },
  ],
}

export function BillingInfo() {
  return (
    <Card className="col-span-full md:col-span-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Billing Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium text-muted-foreground">Total Billed</div>
              <div className="text-2xl font-bold">
                ${(billingData.totalBilled / 1000).toFixed(1)}k
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium text-muted-foreground">Total Paid</div>
              <div className="text-2xl font-bold text-green-600">
                ${(billingData.totalPaid / 1000).toFixed(1)}k
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium text-muted-foreground">Total Unpaid</div>
              <div className="text-2xl font-bold text-red-600">
                ${(billingData.totalUnpaid / 1000).toFixed(1)}k
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Recent Invoices</h3>
            {billingData.recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Invoice #{invoice.id}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    ${invoice.amount.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-600"
                        : invoice.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}