import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

interface IntakeFormDialogProps {
  children?: React.ReactNode
}

export function IntakeFormDialog({ children }: IntakeFormDialogProps) {
  const { toast } = useToast()
  const [clientEmail, setClientEmail] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Intake Form Sent",
      description: "The intake form has been sent to the client.",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Send Intake Form
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Intake Form</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any specific instructions or requirements..."
            />
          </div>
          <Button type="submit">Send Form</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}