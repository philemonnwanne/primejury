import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { addMonths } from "date-fns"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

const events = [
  {
    date: new Date(2024, 1, 15),
    title: "Client Meeting - Smith Case",
    type: "meeting",
    color: "bg-blue-500"
  },
  {
    date: new Date(2024, 1, 18),
    title: "Court Hearing - Johnson vs. Tech Corp",
    type: "hearing",
    color: "bg-green-500"
  },
  {
    date: new Date(2024, 1, 20),
    title: "Document Filing Deadline",
    type: "deadline",
    color: "bg-orange-500"
  },
]

export function LawyerCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const today = new Date()
  const sixMonthsFromNow = addMonths(today, 6)

  const handleSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const date = formData.get("date") as string
    const time = formData.get("time") as string

    toast({
      title: "Meeting Scheduled",
      description: `${title} scheduled for ${date} at ${time}`,
    })
    setIsDialogOpen(false)
  }

  const todayEvents = events.filter(event => 
    event.date.toDateString() === today.toDateString()
  )

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" size="default">
                <Plus className="h-4 w-4" />
                New Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Schedule a Meeting</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSchedule} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Meeting Title</Label>
                  <Input id="title" name="title" className="w-full" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                  <Input id="date" name="date" type="date" className="w-full" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                  <Input id="time" name="time" type="time" className="w-full" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                  <Input id="description" name="description" className="w-full" />
                </div>
                <Button type="submit" className="w-full mt-6">Schedule Meeting</Button>
              </form>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9"
              onClick={() => {
                const prevMonth = new Date(selectedDate)
                prevMonth.setMonth(prevMonth.getMonth() - 1)
                setSelectedDate(prevMonth)
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="text-sm px-3 py-2 min-w-[80px]"
              onClick={() => {
                setSelectedDate(new Date())
                toast({
                  title: "Today's Events",
                  description: todayEvents.length 
                    ? `You have ${todayEvents.length} events today` 
                    : "No events scheduled for today",
                })
              }}
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9"
              onClick={() => {
                const nextMonth = new Date(selectedDate)
                nextMonth.setMonth(nextMonth.getMonth() + 1)
                setSelectedDate(nextMonth)
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            fromDate={today}
            toDate={sixMonthsFromNow}
            className="rounded-md border p-3"
          />
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700">Upcoming Events</h4>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border bg-white/50 backdrop-blur-sm transition-all duration-200 hover:shadow-sm ${
                    event.date.toDateString() === selectedDate.toDateString()
                    ? "ring-1 ring-primary/50"
                    : ""
                  }`}
                >
                  <div className={`w-1 h-full rounded-full ${event.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.date.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5 capitalize">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}