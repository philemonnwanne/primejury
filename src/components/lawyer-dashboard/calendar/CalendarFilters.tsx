import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CalendarFiltersProps {
  selectedView: "month" | "week" | "day" | "list"
  onViewChange: (view: "month" | "week" | "day" | "list") => void
}

export function CalendarFilters({
  selectedView,
  onViewChange,
}: CalendarFiltersProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedView === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewChange("month")}
          >
            Month
          </Button>
          <Button
            variant={selectedView === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewChange("week")}
          >
            Week
          </Button>
          <Button
            variant={selectedView === "day" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewChange("day")}
          >
            Day
          </Button>
          <Button
            variant={selectedView === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewChange("list")}
          >
            List
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Events
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Deadlines
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            Meetings
          </Badge>
        </div>
      </div>
    </div>
  )
}