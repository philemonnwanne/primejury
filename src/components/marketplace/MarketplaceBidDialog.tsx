import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface BidDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bidAmount: string
  setBidAmount: (amount: string) => void
  proposedTimeline: string
  setProposedTimeline: (timeline: string) => void
  bidDetails: string
  setBidDetails: (details: string) => void
  onSubmit: () => void
}

export function MarketplaceBidDialog({
  open,
  onOpenChange,
  bidAmount,
  setBidAmount,
  proposedTimeline,
  setProposedTimeline,
  bidDetails,
  setBidDetails,
  onSubmit
}: BidDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Place Your Bid</DialogTitle>
          <DialogDescription>
            Please provide detailed information about your bid
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bid Amount</label>
            <Input
              placeholder="Enter your bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Proposed Timeline</label>
            <Input
              placeholder="e.g., 3 months"
              value={proposedTimeline}
              onChange={(e) => setProposedTimeline(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bid Details</label>
            <Textarea
              placeholder="Provide details about your approach, experience with similar cases, and why you're the best fit"
              value={bidDetails}
              onChange={(e) => setBidDetails(e.target.value)}
              className="h-32"
            />
          </div>
          <Button className="w-full" onClick={onSubmit}>
            Submit Bid
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}