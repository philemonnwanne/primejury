import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface LawyerProfilesSidebarProps {
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

export function LawyerProfilesSidebar({
  filters,
  onFilterChange,
}: LawyerProfilesSidebarProps) {
  return (
    <Sidebar className="w-[280px] border-r">
      <SidebarContent className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          <button 
            onClick={() => window.location.reload()} 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reset all
          </button>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>State Licensed</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={filters.state} onValueChange={(value) => onFilterChange('state', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Specialty</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={filters.specialty} onValueChange={(value) => onFilterChange('specialty', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
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
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Years of Experience</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select 
              value={filters.yearsOfExperience} 
              onValueChange={(value) => onFilterChange('yearsOfExperience', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Experience</SelectItem>
                <SelectItem value="0-5">0-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10-15">10-15 years</SelectItem>
                <SelectItem value="15+">15+ years</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Success Rate</SidebarGroupLabel>
          <SidebarGroupContent className="px-2 py-4">
            <Slider
              value={[filters.successRate[0], filters.successRate[1]]}
              onValueChange={(value) => onFilterChange('successRate', value)}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="mt-2 text-sm text-muted-foreground">
              {filters.successRate[0]}% - {filters.successRate[1]}%
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Pro Bono Cases</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center space-x-2">
              <Switch
                checked={filters.proBono}
                onCheckedChange={(checked) => onFilterChange('proBono', checked)}
              />
              <Label>Takes Pro Bono Cases</Label>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Active Workload</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={filters.workload} onValueChange={(value) => onFilterChange('workload', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select workload" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Workload</SelectItem>
                <SelectItem value="low">Fewer than 5 cases</SelectItem>
                <SelectItem value="medium">5-10 cases</SelectItem>
                <SelectItem value="high">More than 10 cases</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Gender</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={filters.gender} onValueChange={(value) => onFilterChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Ethnicity</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={filters.ethnicity} onValueChange={(value) => onFilterChange('ethnicity', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select ethnicity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="asian">Asian</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="hispanic">Hispanic</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}