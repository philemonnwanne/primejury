import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  isLawyer: boolean
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
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
  )
}