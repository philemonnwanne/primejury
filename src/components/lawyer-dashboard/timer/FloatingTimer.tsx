import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { Settings, Play, Pause, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TimerSettings } from "./TimerSettings"
import { formatTime } from "./utils"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export function FloatingTimer() {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [mode, setMode] = useState<"auto" | "manual">("auto")
  const dragRef = useRef<{ x: number; y: number } | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const location = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    // Show timer after 2 seconds on case details page
    if (location.pathname.includes("/lawyer-dashboard/case-insights")) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [location])

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
    setIsRunning(!isRunning)
    toast({
      title: !isRunning ? "Timer Started" : "Timer Paused",
      description: !isRunning ? "Now tracking billable hours" : "Timer has been paused"
    })
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed z-50 select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="glass-effect rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="text-lg font-mono">{formatTime(time)}</div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleTimer}
            >
              {isRunning ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-4 w-4" />
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

      <TimerSettings
        open={showSettings}
        onOpenChange={setShowSettings}
        mode={mode}
        onModeChange={setMode}
        time={time}
        onReset={() => setTime(0)}
      />
    </div>
  )
}
