import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockCases } from "@/components/cases/mock-data/cases"
import { formatTime } from "./utils"
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

  // Filter cases to only show those worked on in the past 8 hours
  const recentCases = mockCases.filter(case_ => {
    const lastModified = new Date(case_.lastModified || case_.createdAt).getTime()
    const eightHoursAgo = Date.now() - (8 * 60 * 60 * 1000)
    return lastModified > eightHoursAgo
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {mode === "auto" ? (
            <div className="space-y-2">
              <Label>Recent Cases</Label>
              <Select value={selectedCase} onValueChange={setSelectedCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a case" />
                </SelectTrigger>
                <SelectContent>
                  {recentCases.map(case_ => (
                    <SelectItem key={case_.id} value={case_.id}>
                      {case_.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
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
          )}

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