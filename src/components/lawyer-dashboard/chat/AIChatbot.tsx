import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Loader2, MinimizeIcon, MaximizeIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = { role: "user" as const, content: inputValue }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // In a real implementation, this would make an API call to a language model
      // For now, we'll simulate a response
      const response = { role: "assistant" as const, content: "I'm a demo AI assistant. In the real implementation, I would provide helpful information about the lawyer dashboard based on your question: " + inputValue }
      
      setTimeout(() => {
        setMessages(prev => [...prev, response])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI assistant",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className={`fixed bottom-4 right-4 w-[400px] ${isMinimized ? 'h-12' : 'h-[500px]'} bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg flex flex-col`}>
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-semibold">AI Assistant</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <MaximizeIcon className="h-4 w-4" />
            ) : (
              <MinimizeIcon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted max-w-[80%] rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask anything about the dashboard..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                Send
              </Button>
            </div>
          </form>
        </>
      )}
    </Card>
  )
}