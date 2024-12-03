import { Button } from "@/components/ui/button"
import { Plus, Upload, MessageSquare } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function LawyerQuickActions() {
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} action will be implemented in the next phase`,
    })
  }

  return (
    <div className="space-y-4">
      <Button 
        className="w-full justify-start" 
        onClick={() => handleAction("New Case Note")}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Case Note
      </Button>
      <Button 
        className="w-full justify-start" 
        variant="secondary"
        onClick={() => handleAction("Upload Document")}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload Document
      </Button>
      <Button 
        className="w-full justify-start" 
        variant="secondary"
        onClick={() => handleAction("Client Message")}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Message Client
      </Button>
    </div>
  )
}