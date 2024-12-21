import { Button } from "@/components/ui/button"
import { Plus, Upload, MessageSquare, Calendar, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"

export function LawyerQuickActions() {
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} action will be implemented in the next phase`,
    })
  }

  return (
    <Card className="h-full">
      <CardContent className="grid grid-cols-1 gap-4 p-6">
        <div className="space-y-4 w-full max-w-[400px] mx-auto">
          <Button 
            className="w-full justify-start bg-primary/10 hover:bg-primary/20" 
            variant="ghost"
            onClick={() => handleAction("Create Task")}
          >
            <Plus className="mr-2 h-4 w-4 text-primary" />
            Create New Task
          </Button>
          <Button 
            className="w-full justify-start bg-secondary/10 hover:bg-secondary/20" 
            variant="ghost"
            onClick={() => handleAction("Schedule Event")}
          >
            <Calendar className="mr-2 h-4 w-4 text-secondary" />
            Schedule Event
          </Button>
          <Button 
            className="w-full justify-start bg-muted hover:bg-muted/80" 
            variant="ghost"
            onClick={() => handleAction("Upload Document")}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <Button 
            className="w-full justify-start bg-muted hover:bg-muted/80" 
            variant="ghost"
            onClick={() => handleAction("New Message")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Send Message
          </Button>
          <Button 
            className="w-full justify-start bg-muted hover:bg-muted/80" 
            variant="ghost"
            onClick={() => handleAction("Generate Document")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Document
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}