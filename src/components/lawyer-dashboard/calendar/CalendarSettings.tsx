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
import { Switch } from "@/components/ui/switch"
import { Settings2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CalendarSettings() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [workingHours, setWorkingHours] = useState({ start: "09:00", end: "17:00" })
  const [weekStartDay, setWeekStartDay] = useState("monday")
  const [settings, setSettings] = useState({
    showWeekends: true,
    showDeclinedEvents: false,
    enableReminders: true,
    defaultEventDuration: 60,
    autoAcceptInvites: false,
  })

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your calendar settings have been updated successfully.",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Calendar Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calendar Settings</DialogTitle>
          <DialogDescription>
            Customize your calendar preferences and working hours
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Working Hours</Label>
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={workingHours.start}
                onChange={(e) =>
                  setWorkingHours({ ...workingHours, start: e.target.value })
                }
              />
              <span>to</span>
              <Input
                type="time"
                value={workingHours.end}
                onChange={(e) =>
                  setWorkingHours({ ...workingHours, end: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Week Starts On</Label>
            <Select value={weekStartDay} onValueChange={setWeekStartDay}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-weekends">Show Weekends</Label>
              <Switch
                id="show-weekends"
                checked={settings.showWeekends}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showWeekends: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-declined">Show Declined Events</Label>
              <Switch
                id="show-declined"
                checked={settings.showDeclinedEvents}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showDeclinedEvents: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-reminders">Enable Reminders</Label>
              <Switch
                id="enable-reminders"
                checked={settings.enableReminders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableReminders: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-accept">Auto-accept Invites</Label>
              <Switch
                id="auto-accept"
                checked={settings.autoAcceptInvites}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoAcceptInvites: checked })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveSettings}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}