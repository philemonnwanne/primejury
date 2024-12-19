import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar } from "lucide-react"
import { useState } from "react"

interface BillingTabProps {
  isEditing: boolean
  initialData: any // Replace with proper type
  onSave: () => void
}

export function BillingTab({ isEditing, initialData, onSave }: BillingTabProps) {
  const [billingData, setBillingData] = useState(initialData)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Billing Type</label>
              {isEditing ? (
                <Select
                  value={billingData.billingType}
                  onValueChange={(value) =>
                    setBillingData({ ...billingData, billingType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="flat">Flat Fee</SelectItem>
                    <SelectItem value="contingency">Contingency</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-muted-foreground">{billingData.billingType}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rate/Amount</label>
              {isEditing ? (
                <Input
                  type="number"
                  value={billingData.rate}
                  onChange={(e) =>
                    setBillingData({ ...billingData, rate: e.target.value })
                  }
                  placeholder="Enter amount"
                />
              ) : (
                <p className="text-muted-foreground">${billingData.rate}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Total Paid</p>
                    <p className="text-2xl font-bold">${billingData.totalPaid}</p>
                  </div>
                  <Badge variant="secondary">Paid</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Pending Amount</p>
                    <p className="text-2xl font-bold">${billingData.pendingAmount}</p>
                  </div>
                  <Badge variant="destructive">Pending</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Payment Method</p>
            </div>
            <p className="text-muted-foreground">
              {billingData.paymentMethod.type === "credit_card" ? "Credit Card" : "Bank Account"} ending in {billingData.paymentMethod.last4}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Next Payment</p>
            </div>
            <p className="text-muted-foreground">
              {new Date(billingData.nextPaymentDate).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Payment History</h3>
            <div className="space-y-2">
              {billingData.paymentHistory.map((payment: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">${payment.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={payment.status === "paid" ? "default" : "secondary"}>
                    {payment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <Button onClick={onSave} className="w-full">
          Save Changes
        </Button>
      )}
    </div>
  )
}