import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CalendarEvent } from "@/types/calendar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { EventDetailsSheet } from "@/components/lawyer-dashboard/calendar/EventDetailsSheet"
import { EventFilters, EventCategory } from "@/components/lawyer-dashboard/calendar/EventFilters"
import { AddEventDialog } from "@/components/lawyer-dashboard/calendar/AddEventDialog"
import { CalendarViewContent } from "@/components/lawyer-dashboard/calendar/CalendarViewContent"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "12a Dinner",
    type: "personal",
    start: new Date(2024, 11, 18, 12, 0),
    end: new Date(2024, 11, 18, 13, 0),
    description: "Dinner with clients"
  },
  {
    id: "2",
    title: "Dart Game?",
    type: "personal",
    start: new Date(2024, 11, 18, 15, 0),
    end: new Date(2024, 11, 18, 16, 0),
  },
  {
    id: "3",
    title: "12a Doctor's Appointment",
    type: "personal",
    start: new Date(2024, 11, 20, 12, 0),
    end: new Date(2024, 11, 20, 13, 0),
  },
  {
    id: "4",
    title: "Meeting With Client",
    type: "business",
    start: new Date(2024, 11, 20, 14, 0),
    end: new Date(2024, 11, 20, 15, 0),
  },
  {
    id: "5",
    title: "Family Trip",
    type: "family",
    start: new Date(2024, 11, 22, 9, 0),
    end: new Date(2024, 11, 23, 18, 0),
  },
  {
    id: "6",
    title: "6:27p Design Review",
    type: "business",
    start: new Date(2024, 11, 22, 18, 27),
    end: new Date(2024, 11, 22, 19, 30),
  },
  {
    id: "7",
    title: "Monthly Meeting",
    type: "business",
    start: new Date(2025, 0, 1, 10, 0),
    end: new Date(2025, 0, 1, 11, 0),
  }
]

export default function LawyerCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [view, setView] = useState<"week" | "day" | "list">("week")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>(["Personal", "Client", "Court", "Deadline"])
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
  }

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    toast.success("Event updated successfully")
    setSelectedEvent(null)
  }

  const handleEventDelete = (eventId: string) => {
    toast.success("Event deleted successfully")
    setSelectedEvent(null)
  }

  const handleCategoryChange = (category: EventCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleAddEvent = (newEvent: CalendarEvent) => {
    console.log("New event:", newEvent)
    setIsAddEventOpen(false)
  }

  const filteredEvents = mockEvents.filter(event => {
    const category = event.type.charAt(0).toUpperCase() + event.type.slice(1)
    return selectedCategories.includes(category as EventCategory)
  })

  return (
    <LawyerDashboardLayout>
      <div className="h-full flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-8 w-[300px]"
              />
            </div>
          </div>
          <Button 
            className="bg-[#6366F1] hover:bg-[#5457E5]"
            onClick={() => setIsAddEventOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>

        <div className="flex gap-6">
          <div className="w-[300px] space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                className="w-full"
              />
            </div>
            <EventFilters
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          <div className="flex-1 rounded-lg border">
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => {
                  const newDate = new Date(currentDate)
                  newDate.setDate(currentDate.getDate() - (view === "week" ? 7 : 1))
                  setCurrentDate(newDate)
                }}>
                  ←
                </Button>
                <Button variant="outline" size="icon" onClick={() => {
                  const newDate = new Date(currentDate)
                  newDate.setDate(currentDate.getDate() + (view === "week" ? 7 : 1))
                  setCurrentDate(newDate)
                }}>
                  →
                </Button>
                <h2 className="text-xl font-semibold">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
              </div>
              <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as "week" | "day" | "list")}>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="list">List</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="p-4">
              <CalendarViewContent
                view={view}
                selectedDate={currentDate}
                events={filteredEvents}
              />
            </div>
          </div>
        </div>
      </div>

      <EventDetailsSheet
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onUpdate={handleEventUpdate}
        onDelete={handleEventDelete}
      />

      <AddEventDialog
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onEventAdd={handleAddEvent}
      />
    </LawyerDashboardLayout>
  )
}
