import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COUNTRIES, US_STATES, INDUSTRIES } from "./newsConstants"

type NewsType = "all" | "legal" | "regulatory" | "industry"
type ScopeLevel = "world" | "national" | "state" | "local"

interface NewsFiltersProps {
  selectedType: NewsType
  onTypeChange: (type: NewsType) => void
  onScopeChange: (scope: { level: ScopeLevel; country?: string; state?: string }) => void
  onIndustryChange: (industry: string) => void
}

export function NewsFilters({
  selectedType,
  onTypeChange,
  onScopeChange,
  onIndustryChange,
}: NewsFiltersProps) {
  const [scopeLevel, setScopeLevel] = useState<ScopeLevel>("world")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("")

  const handleScopeLevelChange = (level: ScopeLevel) => {
    setScopeLevel(level)
    const scope = { level }
    onScopeChange(scope)
  }

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    setSelectedState("")
    onScopeChange({ level: scopeLevel, country })
  }

  const handleStateChange = (state: string) => {
    setSelectedState(state)
    onScopeChange({ level: scopeLevel, country: selectedCountry, state })
  }

  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-[180px]">
        <Select value={scopeLevel} onValueChange={handleScopeLevelChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Scope" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="world">World</SelectItem>
            <SelectItem value="national">National</SelectItem>
            <SelectItem value="state">State</SelectItem>
            <SelectItem value="local">Local</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {scopeLevel === "national" && (
        <div className="w-[180px]">
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {scopeLevel === "state" && selectedCountry === "United States" && (
        <div className="w-[180px]">
          <Select value={selectedState} onValueChange={handleStateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {US_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="w-[180px]">
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {INDUSTRIES.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}