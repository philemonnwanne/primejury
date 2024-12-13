import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CounterBidDetails extends BidDetails {
  counterOffer: {
    amount: string
    timeline: string
    additionalNotes: string
  }
}

interface BidDetails {
  id: string
  caseTitle: string
  amount: string
  proposedTimeline: string
  bidDate: string
  status: "pending" | "countered" | "accepted" | "rejected"
  caseDetails: {
    description: string
    location: string
    practiceArea: string
    deadline: string
    budget: string
  }
  bidDetails: {
    strategy: string
    availability: string
    proposedPaymentStructure: string
  }
  clientDetails: {
    name: string
    email: string
    phone: string
    address: string
    occupation: string
  }
}

export function CounterBidCard({ bid }: { bid: CounterBidDetails }) {
  const handleAcceptCounter = () => {
    // Here you would typically make an API call to accept the counter offer
    toast.success("Counter offer accepted")
  }

  const handleRejectCounter = () => {
    // Here you would typically make an API call to reject the counter offer
    toast.success("Counter offer rejected")
  }

  const isHigher = parseFloat(bid.counterOffer.amount.replace(/[^0-9.-]+/g, "")) >
    parseFloat(bid.amount.replace(/[^0-9.-]+/g, ""))

  return (
    <Card key={bid.id} className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{bid.caseTitle}</h3>
          <Badge variant="secondary">Counter Offered</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Client Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Name:</span> {bid.clientDetails.name}</p>
              <p><span className="text-muted-foreground">Email:</span> {bid.clientDetails.email}</p>
              <p><span className="text-muted-foreground">Phone:</span> {bid.clientDetails.phone}</p>
              <p><span className="text-muted-foreground">Address:</span> {bid.clientDetails.address}</p>
              <p><span className="text-muted-foreground">Occupation:</span> {bid.clientDetails.occupation}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Bid Comparison</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 rounded bg-muted">
                <p className="font-medium">Your Bid</p>
                <p>Amount: {bid.amount}</p>
                <p>Timeline: {bid.proposedTimeline}</p>
              </div>
              <div className="p-2 rounded bg-primary/10">
                <p className="font-medium">Counter Offer</p>
                <p className={isHigher ? "text-green-600" : "text-red-600"}>
                  Amount: {bid.counterOffer.amount}
                </p>
                <p>Timeline: {bid.counterOffer.timeline}</p>
                <p>Notes: {bid.counterOffer.additionalNotes}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <h4 className="font-medium mb-2">Case Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Description:</span> {bid.caseDetails.description}</p>
              <p><span className="text-muted-foreground">Location:</span> {bid.caseDetails.location}</p>
              <p><span className="text-muted-foreground">Practice Area:</span> {bid.caseDetails.practiceArea}</p>
              <p><span className="text-muted-foreground">Deadline:</span> {bid.caseDetails.deadline}</p>
              <p><span className="text-muted-foreground">Budget Range:</span> {bid.caseDetails.budget}</p>
            </div>
          </div>

          <div className="col-span-2 flex gap-2">
            <Button 
              className="flex-1" 
              onClick={handleAcceptCounter}
            >
              Accept Counter Offer
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleRejectCounter}
            >
              Reject Counter Offer
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}