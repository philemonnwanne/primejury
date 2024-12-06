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

export function LawyerPublicProfilesSidebar() {
  return (
    <Card className="w-[280px] h-fit">
      <CardContent className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          <button 
            onClick={() => window.location.reload()} 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reset all
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Label>State Licensed</Label>
            <Select>
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
          </div>

          <div>
            <Label>Specialty</Label>
            <Select>
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
          </div>

          <div>
            <Label>Years of Experience</Label>
            <Select>
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
          </div>

          <div>
            <Label>Success Rate</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select success rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Success Rate</SelectItem>
                <SelectItem value="90+">90% or higher</SelectItem>
                <SelectItem value="80-90">80-90%</SelectItem>
                <SelectItem value="70-80">70-80%</SelectItem>
                <SelectItem value="<70">Below 70%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="pro-bono" />
            <Label htmlFor="pro-bono">Takes Pro Bono Cases</Label>
          </div>

          <div>
            <Label>Active Workload</Label>
            <Select>
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
          </div>

          <div>
            <Label>Gender</Label>
            <Select>
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
          </div>

          <div>
            <Label>Ethnicity</Label>
            <Select>
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}