import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Briefcase, Scale, Users } from "lucide-react"

interface LawyerHorizontalFiltersProps {
  filters: {
    state: string;
    specialty: string;
    yearsOfExperience: string;
    successRate: [number, number];
    proBono: boolean;
    workload: string;
    gender: string;
    ethnicity: string;
  };
  onFilterChange: (key: string, value: any) => void;
}

export function LawyerHorizontalFilters({ filters, onFilterChange }: LawyerHorizontalFiltersProps) {
  return (
    <Card className="w-full mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filters</h3>
            <button 
              onClick={() => window.location.reload()} 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Reset all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Select value={filters.state} onValueChange={(value) => onFilterChange('state', value)}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <SelectValue placeholder="Select state" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filters.specialty} onValueChange={(value) => onFilterChange('specialty', value)}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    <SelectValue placeholder="Select specialty" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="criminal">Criminal Law</SelectItem>
                  <SelectItem value="civil">Civil Law</SelectItem>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="family">Family Law</SelectItem>
                  <SelectItem value="immigration">Immigration Law</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filters.yearsOfExperience} onValueChange={(value) => onFilterChange('yearsOfExperience', value)}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <SelectValue placeholder="Experience" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Experience</SelectItem>
                  <SelectItem value="0-5">0-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10-15">10-15 years</SelectItem>
                  <SelectItem value="15+">15+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filters.workload} onValueChange={(value) => onFilterChange('workload', value)}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <SelectValue placeholder="Workload" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Workload</SelectItem>
                  <SelectItem value="low">Fewer than 5 cases</SelectItem>
                  <SelectItem value="medium">5-10 cases</SelectItem>
                  <SelectItem value="high">More than 10 cases</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Switch
                checked={filters.proBono}
                onCheckedChange={(checked) => onFilterChange('proBono', checked)}
              />
              <Label>Takes Pro Bono Cases</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}