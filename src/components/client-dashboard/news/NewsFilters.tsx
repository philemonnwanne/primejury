import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type NewsType = "all" | "legal" | "regulatory" | "industry"

interface NewsFiltersProps {
  selectedType: NewsType
  onTypeChange: (type: NewsType) => void
}

export function NewsFilters({ selectedType, onTypeChange }: NewsFiltersProps) {
  return (
    <div className="w-[180px]">
      <Select
        value={selectedType}
        onValueChange={(value: NewsType) => onTypeChange(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select News Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All News</SelectItem>
          <SelectItem value="legal">Legal Updates</SelectItem>
          <SelectItem value="regulatory">Regulatory Changes</SelectItem>
          <SelectItem value="industry">Industry News</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}