import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function PaymentStructures() {
  const [selectedType, setSelectedType] = useState<string>("hourly")
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Payment Structure Saved",
      description: "The new payment structure has been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Structure Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <RadioGroup
              defaultValue="hourly"
              onValueChange={setSelectedType}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hourly" id="hourly" />
                <Label htmlFor="hourly">Hourly Rate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flat_fee" id="flat_fee" />
                <Label htmlFor="flat_fee">Flat Fee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contingency" id="contingency" />
                <Label htmlFor="contingency">Contingency Fee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="installments" id="installments" />
                <Label htmlFor="installments">Payment Installments</Label>
              </div>
            </RadioGroup>

            {selectedType === "hourly" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Hourly Rate</Label>
                  <Input type="number" placeholder="Enter hourly rate" />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Billable Hours</Label>
                  <Input type="number" placeholder="Enter minimum hours" />
                </div>
              </div>
            )}

            {selectedType === "flat_fee" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Fee Amount</Label>
                  <Input type="number" placeholder="Enter flat fee amount" />
                </div>
                <div className="space-y-2">
                  <Label>Payment Due Date</Label>
                  <Input type="date" />
                </div>
              </div>
            )}

            {selectedType === "contingency" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Percentage</Label>
                  <Input type="number" placeholder="Enter percentage" />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Recovery Amount</Label>
                  <Input type="number" placeholder="Enter minimum amount" />
                </div>
              </div>
            )}

            {selectedType === "installments" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Total Amount</Label>
                  <Input type="number" placeholder="Enter total amount" />
                </div>
                <div className="space-y-2">
                  <Label>Number of Installments</Label>
                  <Input type="number" placeholder="Enter number of installments" />
                </div>
                <div className="space-y-2">
                  <Label>Payment Frequency</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
            )}

            <Button onClick={handleSave} className="w-full">
              Save Payment Structure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}