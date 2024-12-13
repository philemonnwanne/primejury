import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Share2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function ShareCalendarDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [shareableLink, setShareableLink] = useState("")

  const generateShareableLink = () => {
    // In a real application, this would generate a unique, secure link
    const uniqueId = crypto.randomUUID()
    const link = `${window.location.origin}/schedule/${uniqueId}`
    setShareableLink(link)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink)
      toast({
        title: "Link Copied",
        description: "The calendar link has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Calendar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Calendar</DialogTitle>
          <DialogDescription>
            Generate a link to share your calendar with clients or colleagues.
            They'll be able to view your availability and schedule meetings.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="link">Shareable Link</Label>
            <div className="flex gap-2">
              <Input
                id="link"
                value={shareableLink}
                readOnly
                placeholder="Click generate to create a link"
              />
              <Button onClick={generateShareableLink} type="button">
                Generate
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={copyToClipboard}
            disabled={!shareableLink}
            className="w-full"
          >
            Copy Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}