import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export type EventCategory = "Personal" | "Client" | "Court" | "Deadline";

interface EventFiltersProps {
  selectedCategories: EventCategory[];
  onCategoryChange: (category: EventCategory) => void;
}

export function EventFilters({ selectedCategories, onCategoryChange }: EventFiltersProps) {
  const categories: EventCategory[] = ["Personal", "Client", "Court", "Deadline"];

  return (
    <div className="rounded-lg border bg-card text-card-foreground p-4">
      <h3 className="font-medium mb-4">Event Categories</h3>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onCategoryChange(category)}
            />
            <Label htmlFor={category}>{category}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}