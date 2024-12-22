import { useState, useEffect, useRef } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { Settings, Play, Pause, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TimerSettings } from "./TimerSettings"
import { formatTime } from "./utils"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function FloatingTimer() {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [mode, setMode] = useState<"auto" | "manual">("auto")
  const [showModeConfirm, setShowModeConfirm] = useState(false)
  const dragRef = useRef<{ x: number; y: number } | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    // Show timer after 2 seconds on case details page
    if (location.pathname.includes("/lawyer-dashboard/case-insights")) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [location])

  useEffect(() => {
    // Auto-start timer when a case is selected in auto mode
    const caseId = searchParams.get("case")
    if (caseId && mode === "auto" && !isRunning) {
      setIsRunning(true)
      toast({
        title: "Timer Started Automatically",
        description: "Now tracking billable hours for the selected case"
      })
    }
  }, [searchParams, mode])

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && dragRef.current) {
      setPosition({
        x: e.clientX - dragRef.current.x,
        y: e.clientY - dragRef.current.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    dragRef.current = null
  }

  const toggleTimer = () => {
    if (mode === "manual" || !isRunning) {
      setIsRunning(!isRunning)
      toast({
        title: !isRunning ? "Timer Started" : "Timer Paused",
        description: !isRunning ? "Now tracking billable hours" : "Timer has been paused"
      })
    }
  }

  const handleModeToggle = () => {
    setShowModeConfirm(true)
  }

  const confirmModeChange = () => {
    setMode(mode === "auto" ? "manual" : "auto")
    setShowModeConfirm(false)
    toast({
      title: "Timer Mode Changed",
      description: `Switched to ${mode === "auto" ? "manual" : "auto"} mode`
    })
  }

  if (!isVisible) return null

  return (
    <>
      <div
        className={cn(
          "fixed z-50 select-none animate-fade-in",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className={cn(
          "glass-effect rounded-lg p-3 shadow-lg transition-all duration-300",
          isRunning && "ring-2 ring-primary/50"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              "text-lg font-mono transition-colors duration-300",
              isRunning && "text-primary"
            )}>
              {formatTime(time)}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 transition-all duration-300",
                  isRunning ? "hover:bg-red-500/10" : "hover:bg-green-500/10"
                )}
                onClick={toggleTimer}
              >
                {isRunning ? (
                  <Pause className="h-4 w-4 text-red-500" />
                ) : (
                  <Play className="h-4 w-4 text-green-500" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={handleModeToggle}
              >
                Switch to {mode === "auto" ? "Manual" : "Auto"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showModeConfirm} onOpenChange={setShowModeConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Timer Mode?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to switch to {mode === "auto" ? "manual" : "auto"} mode?
              {mode === "auto" 
                ? " Manual mode requires you to start and stop the timer yourself."
                : " Auto mode will automatically track time for selected cases."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmModeChange}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TimerSettings
        open={showSettings}
        onOpenChange={setShowSettings}
        mode={mode}
        onModeChange={setMode}
        time={time}
        onReset={() => setTime(0)}
      />
    </>
  )
}