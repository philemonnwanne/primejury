import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function EventFilters() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground p-4">
      <h3 className="font-medium mb-4">Event Filters</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="view-all" defaultChecked />
          <Label htmlFor="view-all">View All</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="personal" defaultChecked />
          <Label htmlFor="personal">Personal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="business" defaultChecked />
          <Label htmlFor="business">Business</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="family" defaultChecked />
          <Label htmlFor="family">Family</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="holiday" defaultChecked />
          <Label htmlFor="holiday">Holiday</Label>
        </div>
      </div>
    </div>
  )
}