import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { CalendarEvent, CalendarEventType } from "@/types/calendar"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ScheduleEventDialogProps {
  onEventScheduled: (event: CalendarEvent) => void;
  selectedDate?: Date;
}

export function ScheduleEventDialog({ onEventScheduled, selectedDate }: ScheduleEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<CalendarEventType>("meeting");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSharedWithClient, setIsSharedWithClient] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !startTime || !endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title,
      type,
      description,
      start: new Date(startTime),
      end: new Date(endTime),
      isSharedWithClient,
    };

    onEventScheduled(newEvent);
    setOpen(false);
    toast({
      title: "Event Scheduled",
      description: "Your event has been successfully scheduled",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Schedule Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Schedule New Event</DialogTitle>
            <DialogDescription>
              Create a new event in your calendar. Fill out the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={type} onValueChange={(value) => setType(value as CalendarEventType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="video-conference">Video Conference</SelectItem>
                  <SelectItem value="court-date">Court Date</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="blocked">Blocked Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start">Start Time</Label>
              <Input
                id="start"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end">End Time</Label>
              <Input
                id="end"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add event details..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="share-client"
                checked={isSharedWithClient}
                onCheckedChange={setIsSharedWithClient}
              />
              <Label htmlFor="share-client">Share with client</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Schedule Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}