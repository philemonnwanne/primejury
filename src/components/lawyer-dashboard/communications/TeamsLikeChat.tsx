import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Send, 
  Plus, 
  Paperclip,
  UserPlus,
  Users 
} from "lucide-react"
import { GroupChat, ChatMessage, ChatParticipant } from "@/types/chat"

interface TeamsLikeChatProps {
  selectedChat?: GroupChat
  messages: ChatMessage[]
  onSendMessage: (content: string) => void
  onCreateGroup: (name: string, participants: ChatParticipant[]) => void
  onInviteParticipants: (chatId: string, participants: ChatParticipant[]) => void
}

export function TeamsLikeChat({
  selectedChat,
  messages,
  onSendMessage,
  onCreateGroup,
  onInviteParticipants,
}: TeamsLikeChatProps) {
  const [newMessage, setNewMessage] = useState("")
  const [showParticipants, setShowParticipants] = useState(false)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    onSendMessage(newMessage)
    setNewMessage("")
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader className="border-b">
        {selectedChat ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>{selectedChat.name}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm text-muted-foreground"
                  onClick={() => setShowParticipants(true)}
                >
                  {selectedChat.participants.length} participants
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowParticipants(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        ) : (
          <CardTitle>Select or create a chat</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-0">
        {selectedChat ? (
          <>
            <ScrollArea className="flex-1 p-4 h-[calc(100%-8rem)]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {message.senderName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="bg-accent/50 rounded-lg p-3 max-w-[80%]">
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
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
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No chat selected</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select an existing chat or create a new one
              </p>
              <Dialog>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Chat
                </Button>
              </Dialog>
            </div>
          </div>
        )}
      </CardContent>

      <Dialog open={showParticipants} onOpenChange={setShowParticipants}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Participants</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            {selectedChat?.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-3 hover:bg-accent rounded-lg"
              >
                <div>
                  <p className="font-medium">{participant.name}</p>
                  <p className="text-sm text-muted-foreground">{participant.email}</p>
                </div>
                <Badge>{participant.role}</Badge>
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Card>
  )
}