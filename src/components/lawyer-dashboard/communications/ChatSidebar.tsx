import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Users, MessageSquare, Search } from "lucide-react"
import { GroupChat } from "@/types/chat"

interface ChatSidebarProps {
  chats: GroupChat[]
  selectedChat?: GroupChat
  onSelectChat: (chat: GroupChat) => void
}

export function ChatSidebar({
  chats,
  selectedChat,
  onSelectChat,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardHeader>
        <CardTitle className="text-sm">Chats</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-7rem)]">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={cn(
                "w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors",
                selectedChat?.id === chat.id && "bg-accent"
              )}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                {chat.caseId ? (
                  <MessageSquare className="h-5 w-5 text-primary" />
                ) : (
                  <Users className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="text-left">
                <p className="font-medium">{chat.name}</p>
                {chat.lastMessage && (
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {chat.lastMessage.content}
                  </p>
                )}
              </div>
            </button>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}