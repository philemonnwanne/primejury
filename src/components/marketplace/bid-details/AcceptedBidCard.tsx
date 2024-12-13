import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { toast } from "sonner"

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

export function AcceptedBidCard({ bid }: { bid: BidDetails }) {
  const handleImportClient = () => {
    // Here you would typically make an API call to import the client
    toast.success(`${bid.clientDetails.name} has been added to your client list`)
  }

  return (
    <Card key={bid.id} className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{bid.caseTitle}</h3>
          <Badge>Accepted</Badge>
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
            <h4 className="font-medium mb-2">Bid Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Amount:</span> {bid.amount}</p>
              <p><span className="text-muted-foreground">Timeline:</span> {bid.proposedTimeline}</p>
              <p><span className="text-muted-foreground">Date:</span> {bid.bidDate}</p>
              <p><span className="text-muted-foreground">Strategy:</span> {bid.bidDetails.strategy}</p>
              <p><span className="text-muted-foreground">Availability:</span> {bid.bidDetails.availability}</p>
              <p><span className="text-muted-foreground">Payment:</span> {bid.bidDetails.proposedPaymentStructure}</p>
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

          <div className="col-span-2">
            <Button 
              className="w-full"
              onClick={handleImportClient}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Import Client to List
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}