import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface TimeEntry {
  id: string
  date: string
  hours: number
  description: string
  billable: boolean
  createdAt: string
}

interface TimeEntryTabProps {
  caseId: string
}

export function TimeEntryTab({ caseId }: TimeEntryTabProps) {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: "",
    description: "",
    billable: true
  })
  const { toast } = useToast()

  const handleAddEntry = () => {
    if (!newEntry.hours || !newEntry.description) return

    const entry: TimeEntry = {
      id: Date.now().toString(),
      date: newEntry.date,
      hours: Number(newEntry.hours),
      description: newEntry.description,
      billable: newEntry.billable,
      createdAt: new Date().toISOString()
    }

    setTimeEntries([entry, ...timeEntries])
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      hours: "",
      description: "",
      billable: true
    })
    toast({
      title: "Time Entry Added",
      description: "Your time entry has been added successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Time Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                type="number"
                step="0.25"
                value={newEntry.hours}
                onChange={(e) => setNewEntry({ ...newEntry, hours: e.target.value })}
                placeholder="Enter hours"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              placeholder="Describe the work performed..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="billable"
              checked={newEntry.billable}
              onCheckedChange={(checked) => setNewEntry({ ...newEntry, billable: checked })}
            />
            <Label htmlFor="billable">Billable</Label>
          </div>
          <Button onClick={handleAddEntry} className="w-full">Add Entry</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{entry.hours} hours</span>
                    {entry.billable && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Billable
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}