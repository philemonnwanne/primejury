import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, User } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { lawyerProfiles } from "@/data/lawyerProfiles"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  isLawyer: boolean
}

// Mock data - in a real app, this would come from your backend
const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "client1",
    senderName: "You",
    content: "Hello, I have a question about my case.",
    timestamp: new Date("2024-03-10T10:00:00"),
    isLawyer: false
  },
  {
    id: "2",
    senderId: "lawyer1",
    senderName: "Sarah Parker",
    content: "Of course, I'm here to help. What would you like to know?",
    timestamp: new Date("2024-03-10T10:05:00"),
    isLawyer: true
  }
]

export default function Communications() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const { lawyerId } = useParams()
  const [selectedLawyer, setSelectedLawyer] = useState<string | undefined>(lawyerId)

  // Filter lawyers to only show those the client has worked with
  const availableLawyers = lawyerProfiles.filter(lawyer => 
    // In a real app, this would check against actual case history
    ["sarah-parker", "michael-chang", "emily-wilson"].includes(lawyer.id)
  )

  useEffect(() => {
    if (lawyerId) {
      setSelectedLawyer(lawyerId)
    }
  }, [lawyerId])

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

    setMessages([...messages, message])
    setNewMessage("")
  }

  const currentLawyer = availableLawyers.find(l => l.id === selectedLawyer)

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="space-y-4">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Secure Messages
            </CardTitle>
            {!lawyerId && (
              <Select
                value={selectedLawyer}
                onValueChange={setSelectedLawyer}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select a lawyer to message" />
                </SelectTrigger>
                <SelectContent>
                  {availableLawyers.map((lawyer) => (
                    <SelectItem key={lawyer.id} value={lawyer.id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {lawyer.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {currentLawyer && (
              <p className="text-sm text-muted-foreground">
                Messaging with: {currentLawyer.name}
              </p>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isLawyer ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isLawyer
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm font-medium">{message.senderName}</p>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
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
    </ClientDashboardLayout>
  )
}