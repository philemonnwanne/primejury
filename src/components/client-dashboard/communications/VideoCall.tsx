import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Camera, Mic, PhoneCall, Video } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface VideoCallProps {
  selectedLawyer: string | undefined
  currentMeeting?: {
    startTime: Date
    endTime: Date
    lawyerId: string
  } | null
}

export function VideoCall({ selectedLawyer, currentMeeting }: VideoCallProps) {
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const { toast } = useToast()

  const isMeetingActive = currentMeeting && 
    new Date() >= currentMeeting.startTime && 
    new Date() <= currentMeeting.endTime && 
    currentMeeting.lawyerId === selectedLawyer

  const startVideoCall = () => {
    if (!selectedLawyer) {
      toast({
        title: "Cannot start call",
        description: "Please select a lawyer first",
        variant: "destructive",
      })
      return
    }

    if (!isMeetingActive) {
      toast({
        title: "Cannot start call",
        description: "No scheduled meeting at this time",
        variant: "destructive",
      })
      return
    }

    setIsInCall(true)
    toast({
      title: "Video call started",
      description: "Connected with your lawyer",
    })
  }

  const endVideoCall = () => {
    setIsInCall(false)
    setIsMuted(false)
    setIsVideoOn(true)
    toast({
      title: "Call ended",
      description: "Video call has been terminated",
    })
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    toast({
      title: isMuted ? "Microphone unmuted" : "Microphone muted",
    })
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    toast({
      title: isVideoOn ? "Camera turned off" : "Camera turned on",
    })
  }

  if (!selectedLawyer) return null

  return (
    <>
      {!isInCall ? (
        <Button 
          onClick={startVideoCall} 
          className="gap-2"
          disabled={!isMeetingActive}
        >
          <Video className="h-4 w-4" />
          {isMeetingActive ? "Start Video Call" : "No Meeting Scheduled"}
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className={cn(isMuted && "bg-destructive hover:bg-destructive")}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleVideo}
            className={cn(!isVideoOn && "bg-destructive hover:bg-destructive")}
          >
            <Camera className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={endVideoCall}
          >
            <PhoneCall className="h-4 w-4" />
          </Button>
        </div>
      )}
      {isInCall && (
        <div className="bg-muted rounded-lg mb-4 h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">
            {isVideoOn ? "Video call in progress" : "Camera is turned off"}
          </p>
        </div>
      )}
    </>
  )
}