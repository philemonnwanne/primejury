import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { PaymentStructureForm } from "./payment-structures/PaymentStructureForm"
import { PaymentStructureSelector } from "./payment-structures/PaymentStructureSelector"
import { Case, PaymentStructure } from "./payment-structures/types"

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
          <PaymentStructureSelector
            cases={mockCases}
            selectedCase={selectedCase}
            onCaseSelect={handleCaseSelect}
          />

          {selectedCase && (
            <PaymentStructureForm
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              rate={rate}
              setRate={setRate}
              amount={amount}
              setAmount={setAmount}
              percentage={percentage}
              setPercentage={setPercentage}
              installments={installments}
              setInstallments={setInstallments}
              frequency={frequency}
              setFrequency={setFrequency}
              onSave={handleSave}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}