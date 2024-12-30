import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { states, counties, courtTypes, caseTypes } from "./formFilterData"

interface FormFiltersProps {
  onSearch: (value: string) => void
  onCategoryChange: (value: string) => void
  onLanguageChange: (value: string) => void
  onStateChange?: (value: string) => void
  onCountyChange?: (value: string) => void
  onCourtTypeChange?: (value: string) => void
  onCaseTypeChange?: (value: string) => void
}

export function FormFilters({
  onSearch,
  onCategoryChange,
  onLanguageChange,
  onStateChange,
  onCountyChange,
  onCourtTypeChange,
  onCaseTypeChange
}: FormFiltersProps) {
  const [selectedState, setSelectedState] = useState<string>("")
  const [selectedCounty, setSelectedCounty] = useState<string>("")
  const [selectedCourtType, setSelectedCourtType] = useState<string>("")
  const [selectedCaseType, setSelectedCaseType] = useState<string>("")

  const handleStateChange = (value: string) => {
    setSelectedState(value)
    setSelectedCounty("")
    setSelectedCourtType("")
    setSelectedCaseType("")
    onStateChange?.(value)
  }

  const handleCountyChange = (value: string) => {
    setSelectedCounty(value)
    setSelectedCourtType("")
    setSelectedCaseType("")
    onCountyChange?.(value)
  }

  const handleCourtTypeChange = (value: string) => {
    setSelectedCourtType(value)
    setSelectedCaseType("")
    onCourtTypeChange?.(value)
  }

  const handleCaseTypeChange = (value: string) => {
    setSelectedCaseType(value)
    onCaseTypeChange?.(value)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search forms..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select value={selectedState} onValueChange={handleStateChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.id} value={state.id}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedCounty}
          onValueChange={handleCountyChange}
          disabled={!selectedState}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select County" />
          </SelectTrigger>
          <SelectContent>
            {selectedState &&
              counties[selectedState]?.map((county) => (
                <SelectItem key={county.id} value={county.id}>
                  {county.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedCourtType}
          onValueChange={handleCourtTypeChange}
          disabled={!selectedCounty}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Court Type" />
          </SelectTrigger>
          <SelectContent>
            {selectedCounty &&
              courtTypes[selectedCounty]?.map((court) => (
                <SelectItem key={court.id} value={court.id}>
                  {court.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedCaseType}
          onValueChange={handleCaseTypeChange}
          disabled={!selectedCourtType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Case Type" />
          </SelectTrigger>
          <SelectContent>
            {selectedCourtType &&
              caseTypes[selectedCourtType]?.map((caseType) => (
                <SelectItem key={caseType.id} value={caseType.id}>
                  {caseType.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="civil">Civil</SelectItem>
            <SelectItem value="criminal">Criminal</SelectItem>
            <SelectItem value="family">Family</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onLanguageChange}>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}