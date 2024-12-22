import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { formatTime } from "./utils"
import { mockCases } from "@/components/cases/mock-data/cases"
import { useState, useEffect } from "react"

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
  const [selectedCase, setSelectedCase] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [savedDescriptions, setSavedDescriptions] = useState<string[]>([])

  useEffect(() => {
    // Load saved descriptions from localStorage
    const saved = localStorage.getItem(`descriptions_${selectedCase}`)
    if (saved) {
      setSavedDescriptions(JSON.parse(saved))
    }
  }, [selectedCase])

  const handleSaveDescription = () => {
    if (description && selectedCase) {
      const updated = [...new Set([...savedDescriptions, description])]
      localStorage.setItem(`descriptions_${selectedCase}`, JSON.stringify(updated))
      setSavedDescriptions(updated)
      setDescription("")
    }
  }

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
            <Label>Select Case</Label>
            <Select value={selectedCase} onValueChange={setSelectedCase}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a case" />
              </SelectTrigger>
              <SelectContent>
                {mockCases.map(case_ => (
                  <SelectItem key={case_.id} value={case_.id}>
                    {case_.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are you working on?"
            />
            {savedDescriptions.length > 0 && (
              <div className="mt-2">
                <Label className="text-sm">Quick Descriptions</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {savedDescriptions.map((desc, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setDescription(desc)}
                    >
                      {desc}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={handleSaveDescription}
              disabled={!description}
            >
              Save Description
            </Button>
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