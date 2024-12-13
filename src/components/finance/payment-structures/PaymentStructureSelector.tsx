import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Case } from "./types"

interface PaymentStructureSelectorProps {
  cases: Case[]
  selectedCase: string
  onCaseSelect: (caseId: string) => void
}

export function PaymentStructureSelector({ cases, selectedCase, onCaseSelect }: PaymentStructureSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Select Case</Label>
      <Select value={selectedCase} onValueChange={onCaseSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a case" />
        </SelectTrigger>
        <SelectContent>
          {cases.map(case_ => (
            <SelectItem key={case_.id} value={case_.id}>
              {case_.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}