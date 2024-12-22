import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Prison, AlertCircle, Calendar, DollarSign, MapPin, FileText } from "lucide-react"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface Case {
  id: string
  title: string
  type: string
  description: string
  location: string
  budget: string
  postedDate: string
  isUrgent: boolean
  fromJail: boolean
  status: string
  clientInfo?: {
    name: string
    contact: string
  }
  requirements?: string[]
  deadline?: string
  expectedOutcome?: string
}

interface CaseDetailsDialogProps {
  case_: Case | null
  onClose: () => void
  onBidSubmitted: (caseId: string) => void
}

export function CaseDetailsDialog({ case_, onClose, onBidSubmitted }: CaseDetailsDialogProps) {
  const [bidAmount, setBidAmount] = useState("")
  const [proposedTimeline, setProposedTimeline] = useState("")
  const [bidDetails, setBidDetails] = useState("")

  const handleSubmitBid = () => {
    if (!case_) return
    
    if (!bidAmount || !proposedTimeline || !bidDetails) {
      toast.error("Please fill in all bid details")
      return
    }

    onBidSubmitted(case_.id)
    onClose()
    setBidAmount("")
    setProposedTimeline("")
    setBidDetails("")
  }

  return (
    <Dialog open={!!case_} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{case_?.title}</DialogTitle>
            <div className="flex gap-2">
              {case_?.fromJail && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Prison className="h-4 w-4" />
                  Posted from Facility
                </Badge>
              )}
              {case_?.isUrgent && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Urgent
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{case_?.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>{case_?.budget}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Posted: {case_?.postedDate && new Date(case_?.postedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Deadline: {case_?.deadline}</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Case Description</h3>
            <p className="text-muted-foreground">{case_?.description}</p>
          </div>

          {case_?.requirements && (
            <div>
              <h3 className="font-medium mb-2">Requirements</h3>
              <ul className="list-disc pl-4 space-y-1">
                {case_.requirements.map((req, index) => (
                  <li key={index} className="text-muted-foreground">{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-2">Expected Outcome</h3>
            <p className="text-muted-foreground">{case_?.expectedOutcome}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Place Your Bid</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bidAmount">Bid Amount</Label>
                <Input
                  id="bidAmount"
                  placeholder="Enter your bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="timeline">Proposed Timeline</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., 3 months"
                  value={proposedTimeline}
                  onChange={(e) => setProposedTimeline(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="details">Bid Details</Label>
                <Textarea
                  id="details"
                  placeholder="Provide details about your approach, experience with similar cases, and why you're the best fit"
                  value={bidDetails}
                  onChange={(e) => setBidDetails(e.target.value)}
                  className="h-32"
                />
              </div>
              <Button className="w-full" onClick={handleSubmitBid}>
                Submit Bid
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
