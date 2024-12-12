import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PaymentStructure } from "./types"

interface PaymentStructureFormProps {
  selectedType: PaymentStructure["type"]
  setSelectedType: (type: PaymentStructure["type"]) => void
  rate: string
  setRate: (rate: string) => void
  amount: string
  setAmount: (amount: string) => void
  percentage: string
  setPercentage: (percentage: string) => void
  installments: string
  setInstallments: (installments: string) => void
  frequency: string
  setFrequency: (frequency: string) => void
  onSave: () => void
}

export function PaymentStructureForm({
  selectedType,
  setSelectedType,
  rate,
  setRate,
  amount,
  setAmount,
  percentage,
  setPercentage,
  installments,
  setInstallments,
  frequency,
  setFrequency,
  onSave,
}: PaymentStructureFormProps) {
  return (
    <div className="space-y-6">
      <RadioGroup
        value={selectedType}
        onValueChange={(value: PaymentStructure["type"]) => setSelectedType(value)}
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
        <div className="space-y-2">
          <Label>Hourly Rate ($)</Label>
          <Input 
            type="number" 
            value={rate} 
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter hourly rate" 
          />
        </div>
      )}

      {selectedType === "flat_fee" && (
        <div className="space-y-2">
          <Label>Fee Amount ($)</Label>
          <Input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter flat fee amount" 
          />
        </div>
      )}

      {selectedType === "contingency" && (
        <div className="space-y-2">
          <Label>Percentage (%)</Label>
          <Input 
            type="number" 
            value={percentage} 
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Enter percentage" 
          />
        </div>
      )}

      {selectedType === "installments" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Total Amount ($)</Label>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter total amount" 
            />
          </div>
          <div className="space-y-2">
            <Label>Number of Installments</Label>
            <Input 
              type="number" 
              value={installments} 
              onChange={(e) => setInstallments(e.target.value)}
              placeholder="Enter number of installments" 
            />
          </div>
          <div className="space-y-2">
            <Label>Payment Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Button onClick={onSave} className="w-full">
        Save Payment Structure
      </Button>
    </div>
  )
}