import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const notifications = [
  { id: "task_reminders", label: "Task Reminders", description: "Get notified about upcoming tasks" },
  { id: "case_updates", label: "Case Updates", description: "Receive updates on case progress" },
  { id: "client_messages", label: "Client Messages", description: "Get notified about new client messages" },
  { id: "deadline_alerts", label: "Deadline Alerts", description: "Receive alerts for approaching deadlines" },
]

export function NotificationPreferences() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Notification Preferences</h2>
          <p className="text-muted-foreground">Customize your notification settings</p>
        </div>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{notification.label}</CardTitle>
              <CardDescription>{notification.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${notification.id}-enable`}>Enable notifications</Label>
                <Switch id={`${notification.id}-enable`} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor={`${notification.id}-frequency`}>Frequency</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}