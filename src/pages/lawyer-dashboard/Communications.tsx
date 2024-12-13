import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, User } from "lucide-react"
import { useState } from "react"
import { VideoCall } from "@/components/client-dashboard/communications/VideoCall"
import { MessageList } from "@/components/client-dashboard/communications/MessageList"
import { ClientList } from "@/components/lawyer-dashboard/communications/ClientList"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

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
    clientId: "client-1",
    startTime: new Date(2024, 3, 15, 14, 0), // April 15, 2024, 2:00 PM
    endTime: new Date(2024, 3, 15, 15, 0),   // April 15, 2024, 3:00 PM
  },
  {
    clientId: "client-2",
    startTime: new Date(2024, 3, 16, 10, 0), // April 16, 2024, 10:00 AM
    endTime: new Date(2024, 3, 16, 11, 0),   // April 16, 2024, 11:00 AM
  },
]

export default function LawyerCommunications() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [selectedClient, setSelectedClient] = useState<string | undefined>()

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "lawyer1",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      isLawyer: true
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")
  }

  const currentMeeting = scheduledMeetings.find(
    meeting => meeting.clientId === selectedClient
  )

  const currentClient = mockClients.find(c => c.id === selectedClient)

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
        </div>

        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Contacts List */}
          <Card className="col-span-3 flex flex-col">
            <CardHeader>
              <CardTitle className="text-sm">Your Clients</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ClientList 
                clients={mockClients}
                selectedClient={selectedClient}
                onSelectClient={setSelectedClient}
              />
            </CardContent>
          </Card>

          {/* Communication Area */}
          <Card className="col-span-9 flex flex-col">
            <CardHeader className="border-b">
              {currentClient ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{currentClient.name}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        {currentClient.cases.map((c, index) => (
                          <Badge key={index} variant="secondary">
                            {c.title}
                          </Badge>
                        ))}
                      </div>
                      {currentMeeting && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Next meeting: {currentMeeting.startTime.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <VideoCall 
                    selectedLawyer={selectedClient}
                    currentMeeting={currentMeeting}
                  />
                </div>
              ) : (
                <CardTitle>Select a client to start messaging</CardTitle>
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
                  disabled={!selectedClient}
                />
                <Button onClick={handleSendMessage} disabled={!selectedClient}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}

// Mock client data with associated cases
const mockClients = [
  {
    id: "client-1",
    name: "John Smith",
    cases: [
      { id: "case-1", title: "Contract Dispute" },
      { id: "case-2", title: "Property Settlement" }
    ],
    status: "active"
  },
  {
    id: "client-2",
    name: "Sarah Johnson",
    cases: [
      { id: "case-3", title: "Employment Law" }
    ],
    status: "active"
  },
  {
    id: "client-3",
    name: "Michael Brown",
    cases: [
      { id: "case-4", title: "Business Litigation" },
      { id: "case-5", title: "Intellectual Property" },
      { id: "case-6", title: "Contract Review" }
    ],
    status: "active"
  }
]