import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Phone, Video } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function LawyerCommunication() {
  const navigate = useNavigate()
  const lawyerId = "1" // In a real app, this would be fetched from context or props

  const handleStartChat = () => {
    navigate(`/client-dashboard/communications/${lawyerId}`)
  }

  const handleStartCall = () => {
    toast.success("Initiating voice call...")
  }

  const handleStartVideo = () => {
    toast.success("Initiating video call...")
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleStartChat} 
            className="w-full"
            variant="outline"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Chat
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Voice Call</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleStartCall} 
            className="w-full"
            variant="outline"
          >
            <Phone className="mr-2 h-4 w-4" />
            Start Call
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Video Call</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleStartVideo} 
            className="w-full"
            variant="outline"
          >
            <Video className="mr-2 h-4 w-4" />
            Start Video
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}