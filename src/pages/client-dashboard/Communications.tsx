import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, User } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { lawyerProfiles } from "@/data/lawyerProfiles"
import { cn } from "@/lib/utils"

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

        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Contacts List */}
          <Card className="col-span-3 flex flex-col">
            <CardHeader>
              <CardTitle className="text-sm">Your Lawyers</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full">
                {availableLawyers.map((lawyer) => (
                  <button
                    key={lawyer.id}
                    onClick={() => setSelectedLawyer(lawyer.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors",
                      selectedLawyer === lawyer.id && "bg-accent"
                    )}
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{lawyer.name}</p>
                      <p className="text-xs text-muted-foreground">{lawyer.specialization}</p>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Messages Area */}
          <Card className="col-span-9 flex flex-col">
            <CardHeader className="border-b">
              {currentLawyer ? (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{currentLawyer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{currentLawyer.specialization}</p>
                  </div>
                </div>
              ) : (
                <CardTitle>Select a lawyer to start messaging</CardTitle>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4">
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
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.isLawyer
                            ? "bg-muted"
                            : "bg-primary text-primary-foreground"
                        )}
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
      </div>
    </ClientDashboardLayout>
  )
}