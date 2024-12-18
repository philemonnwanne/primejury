import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface BillingTabProps {
  isEditing: boolean
  initialData: any // Replace with proper type
}

export function BillingTab({ isEditing, initialData }: BillingTabProps) {
  const [billingData, setBillingData] = useState(initialData)
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Billing Updated",
      description: "Billing information has been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Schedule</label>
          {isEditing ? (
            <Select
              value={billingData.schedule}
              onValueChange={(value) =>
                setBillingData({ ...billingData, schedule: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="milestone">Milestone-based</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <p className="text-muted-foreground">{billingData.schedule}</p>
          )}
        </div>
        {isEditing && <Button onClick={handleSave}>Update Billing</Button>}
      </CardContent>
    </Card>
  )
}