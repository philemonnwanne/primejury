import { Button } from "@/components/ui/button"
import { VideoCamera } from "lucide-react"

interface VideoCallProps {
  selectedLawyer?: string;
  currentMeeting?: {
    startTime: Date;
    endTime: Date;
    lawyerId?: string;
    clientId?: string;
  };
}

export function VideoCall({ selectedLawyer, currentMeeting }: VideoCallProps) {
  const handleStartCall = () => {
    // Logic to start a video call
    console.log("Starting video call with", selectedLawyer);
  };

  return (
    <div className="flex items-center">
      {currentMeeting ? (
        <Button onClick={handleStartCall} className="flex items-center">
          <VideoCamera className="mr-2" />
          Start Video Call
        </Button>
      ) : (
        <span>No active meeting</span>
      )}
    </div>
  )
}
