import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

interface EditBidDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bid: {
    id: string
    amount: string
    proposedTimeline: string
    bidDetails: {
      strategy: string
      availability: string
      proposedPaymentStructure: string
    }
  }
  onSave: (updatedBid: {
    id: string
    amount: string
    proposedTimeline: string
    bidDetails: {
      strategy: string
      availability: string
      proposedPaymentStructure: string
    }
  }) => void
}

export function EditBidDialog({ open, onOpenChange, bid, onSave }: EditBidDialogProps) {
  const [editedBid, setEditedBid] = useState(bid)

  const handleSave = () => {
    onSave(editedBid)
    toast.success("Bid updated successfully")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Bid</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bid Amount</label>
            <Input
              value={editedBid.amount}
              onChange={(e) => setEditedBid({ ...editedBid, amount: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Proposed Timeline</label>
            <Input
              value={editedBid.proposedTimeline}
              onChange={(e) => setEditedBid({ ...editedBid, proposedTimeline: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Strategy</label>
            <Textarea
              value={editedBid.bidDetails.strategy}
              onChange={(e) => setEditedBid({
                ...editedBid,
                bidDetails: { ...editedBid.bidDetails, strategy: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Availability</label>
            <Input
              value={editedBid.bidDetails.availability}
              onChange={(e) => setEditedBid({
                ...editedBid,
                bidDetails: { ...editedBid.bidDetails, availability: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Structure</label>
            <Input
              value={editedBid.bidDetails.proposedPaymentStructure}
              onChange={(e) => setEditedBid({
                ...editedBid,
                bidDetails: { ...editedBid.bidDetails, proposedPaymentStructure: e.target.value }
              })}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">Save Changes</Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}