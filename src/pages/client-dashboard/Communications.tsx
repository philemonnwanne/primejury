import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, User } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { lawyerProfiles } from "@/data/lawyerProfiles"
import { VideoCall } from "@/components/client-dashboard/communications/VideoCall"
import { MessageList } from "@/components/client-dashboard/communications/MessageList"
import { LawyerList } from "@/components/client-dashboard/communications/LawyerList"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  isLawyer: boolean
}

// Mock scheduled meetings data
const scheduledMeetings = [
  {
    lawyerId: "sarah-parker",
    startTime: new Date(2024, 3, 15, 14, 0), // April 15, 2024, 2:00 PM
    endTime: new Date(2024, 3, 15, 15, 0),   // April 15, 2024, 3:00 PM
  },
  {
    lawyerId: "michael-chang",
    startTime: new Date(2024, 3, 16, 10, 0), // April 16, 2024, 10:00 AM
    endTime: new Date(2024, 3, 16, 11, 0),   // April 16, 2024, 11:00 AM
  },
]

export default function Communications() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const { lawyerId } = useParams()
  const [selectedLawyer, setSelectedLawyer] = useState<string | undefined>(lawyerId)

  // Filter lawyers to only show those the client has worked with
  const availableLawyers = lawyerProfiles.filter(lawyer => 
    ["sarah-parker", "michael-chang", "emily-wilson"].includes(lawyer.id)
  )

  const currentMeeting = scheduledMeetings.find(
    meeting => meeting.lawyerId === selectedLawyer
  )

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "client1",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      isLawyer: false
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")
  }

  const currentLawyer = availableLawyers.find(l => l.id === selectedLawyer)

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
        </div>

        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Contacts List */}
          <Card className="col-span-3 flex flex-col">
            <CardHeader>
              <CardTitle className="text-sm">Your Lawyers</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <LawyerList 
                lawyers={availableLawyers}
                selectedLawyer={selectedLawyer}
                onSelectLawyer={setSelectedLawyer}
              />
            </CardContent>
          </Card>

          {/* Communication Area */}
          <Card className="col-span-9 flex flex-col">
            <CardHeader className="border-b">
              {currentLawyer ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{currentLawyer.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {currentLawyer.specialization}
                      </p>
                      {currentMeeting && (
                        <p className="text-xs text-muted-foreground">
                          Next meeting: {currentMeeting.startTime.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <VideoCall 
                    selectedLawyer={selectedLawyer}
                    currentMeeting={currentMeeting}
                  />
                </div>
              ) : (
                <CardTitle>Select a lawyer to start messaging</CardTitle>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4">
              <MessageList messages={messages} />
              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={!selectedLawyer}
                />
                <Button onClick={handleSendMessage} disabled={!selectedLawyer}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientDashboardLayout>
  )
}