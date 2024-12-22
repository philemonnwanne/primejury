import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Briefcase, Scale, Flag } from "lucide-react"

interface MarketplaceFiltersProps {
  onFilterChange?: (filters: {
    search: string
    caseType: string
    location: string
    specialty: string
    proBono: boolean
    fromJail: boolean
  }) => void
}

export function MarketplaceFilters({ onFilterChange }: MarketplaceFiltersProps) {
  const handleFilterChange = (key: string, value: any) => {
    if (onFilterChange) {
      onFilterChange({
        search: "",
        caseType: "all",
        location: "all",
        specialty: "all",
        proBono: false,
        fromJail: false,
        [key]: value,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search cases..." 
            className="pl-8"
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <Select onValueChange={(value) => handleFilterChange("caseType", value)}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <SelectValue placeholder="Case Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="civil">Civil</SelectItem>
              <SelectItem value="criminal">Criminal</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleFilterChange("location", value)}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="sacramento">Sacramento, CA</SelectItem>
              <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
              <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleFilterChange("specialty", value)}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                <SelectValue placeholder="Specialty" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="civil">Civil Litigation</SelectItem>
              <SelectItem value="corporate">Corporate Law</SelectItem>
              <SelectItem value="criminal">Criminal Defense</SelectItem>
              <SelectItem value="family">Family Law</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Switch 
            id="pro-bono" 
            onCheckedChange={(checked) => handleFilterChange("proBono", checked)}
          />
          <Label htmlFor="pro-bono">Show Pro Bono Cases Only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="from-jail" 
            onCheckedChange={(checked) => handleFilterChange("fromJail", checked)}
          />
          <Label htmlFor="from-jail" className="flex items-center gap-2">
            Show Cases Posted from Jail
            <Flag className="h-4 w-4 text-red-500" />
          </Label>
        </div>
      </div>
    </div>
  )
}