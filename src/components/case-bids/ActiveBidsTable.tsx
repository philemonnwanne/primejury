import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function ActiveBidsTable() {
  const bids = [
    {
      id: 1,
      lawyerId: "sarah-parker",
      lawyerName: "Sarah Parker",
      caseTitle: "Contract Dispute Resolution",
      amount: "$7,500",
      proposedTimeline: "3-4 months",
      status: "Pending",
      bidDate: "2024-03-12",
    },
    // Add more mock bids as needed
  ]

  const handleBidAction = (bidId: number, action: 'accept' | 'decline' | 'counter') => {
    const actionMessages = {
      accept: "Bid accepted successfully",
      decline: "Bid declined",
      counter: "Counter offer sent",
    }
    toast.success(actionMessages[action])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Received Bids</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{bid.caseTitle}</h3>
                  <Link 
                    to={`/lawyers/${bid.lawyerId}`}
                    className="text-primary hover:underline"
                  >
                    {bid.lawyerName}
                  </Link>
                </div>
                <Badge>{bid.status}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bid Amount</p>
                  <p>{bid.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                  <p>{bid.proposedTimeline}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bid Date</p>
                  <p>{new Date(bid.bidDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="default"
                  onClick={() => handleBidAction(bid.id, 'accept')}
                >
                  Accept
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleBidAction(bid.id, 'counter')}
                >
                  Counter
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleBidAction(bid.id, 'decline')}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}