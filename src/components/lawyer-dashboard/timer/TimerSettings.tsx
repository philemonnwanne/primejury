import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formatTime } from "./utils"

interface TimerSettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "auto" | "manual"
  onModeChange: (mode: "auto" | "manual") => void
  time: number
  onReset: () => void
}

export function TimerSettings({
  open,
  onOpenChange,
  mode,
  onModeChange,
  time,
  onReset,
}: TimerSettingsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Tracking Mode</Label>
            <RadioGroup
              value={mode}
              onValueChange={(value) => onModeChange(value as "auto" | "manual")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="auto" id="auto" className="peer sr-only" />
                <Label
                  htmlFor="auto"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Automatic</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="manual"
                  id="manual"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="manual"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Manual</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Current Session</Label>
            <div className="rounded-md border p-4">
              <div className="text-2xl font-mono text-center">
                {formatTime(time)}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={onReset}>
                  Reset Timer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}