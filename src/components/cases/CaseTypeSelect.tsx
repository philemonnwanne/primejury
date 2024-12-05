import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormStep } from "./questions/caseTypeQuestions"

interface CaseTypeSelectProps {
  question: string
  options: FormStep["options"]
  onValueChange: (value: string) => void
  placeholder?: string
}

export function CaseTypeSelect({ 
  question, 
  options, 
  onValueChange, 
  placeholder 
}: CaseTypeSelectProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder || question} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}