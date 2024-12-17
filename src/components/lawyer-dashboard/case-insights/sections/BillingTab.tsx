import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface BillingInfo {
  billingType: string
  rate: string
  paymentSchedule: string
}

export function BillingTab() {
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    billingType: "hourly",
    rate: "",
    paymentSchedule: "monthly"
  })
  const { toast } = useToast()

  const handleUpdate = () => {
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
            <Select
              value={billingInfo.billingType}
              onValueChange={(value) => setBillingInfo({ ...billingInfo, billingType: value })}
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
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Rate/Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={billingInfo.rate}
              onChange={(e) => setBillingInfo({ ...billingInfo, rate: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Schedule</label>
          <Select
            value={billingInfo.paymentSchedule}
            onValueChange={(value) => setBillingInfo({ ...billingInfo, paymentSchedule: value })}
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
        </div>
        <Button onClick={handleUpdate}>Update Billing</Button>
      </CardContent>
    </Card>
  )
}