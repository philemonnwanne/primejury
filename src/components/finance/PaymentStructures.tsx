import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Case {
  id: string
  title: string
  currentStructure: PaymentStructure
}

interface PaymentStructure {
  type: "hourly" | "flat_fee" | "contingency" | "installments"
  details: {
    rate?: number
    amount?: number
    percentage?: number
    installments?: number
    frequency?: "weekly" | "biweekly" | "monthly" | "quarterly"
  }
}

// Mock data - in a real app, this would come from an API
const mockCases: Case[] = [
  {
    id: "1",
    title: "Smith vs. Johnson",
    currentStructure: {
      type: "hourly",
      details: { rate: 350 }
    }
  },
  {
    id: "2",
    title: "Estate Planning - Brown",
    currentStructure: {
      type: "flat_fee",
      details: { amount: 5000 }
    }
  },
  {
    id: "3",
    title: "Personal Injury Case",
    currentStructure: {
      type: "contingency",
      details: { percentage: 33 }
    }
  }
]

export function PaymentStructures() {
  const [selectedCase, setSelectedCase] = useState<string>("")
  const [selectedType, setSelectedType] = useState<PaymentStructure["type"]>("hourly")
  const [rate, setRate] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [percentage, setPercentage] = useState<string>("")
  const [installments, setInstallments] = useState<string>("")
  const [frequency, setFrequency] = useState<string>("monthly")
  const { toast } = useToast()

  const handleCaseSelect = (caseId: string) => {
    const selectedCase = mockCases.find(c => c.id === caseId)
    if (selectedCase) {
      setSelectedCase(caseId)
      setSelectedType(selectedCase.currentStructure.type)
      const details = selectedCase.currentStructure.details
      setRate(details.rate?.toString() || "")
      setAmount(details.amount?.toString() || "")
      setPercentage(details.percentage?.toString() || "")
      setInstallments(details.installments?.toString() || "")
      setFrequency(details.frequency || "monthly")
    }
  }

  const handleSave = () => {
    toast({
      title: "Payment Structure Updated",
      description: "The payment structure has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Structure Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Case</Label>
              <Select value={selectedCase} onValueChange={handleCaseSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a case" />
                </SelectTrigger>
                <SelectContent>
                  {mockCases.map(case_ => (
                    <SelectItem key={case_.id} value={case_.id}>
                      {case_.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCase && (
              <>
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

                <Button onClick={handleSave} className="w-full">
                  Save Payment Structure
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}