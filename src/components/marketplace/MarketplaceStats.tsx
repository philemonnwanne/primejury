import { Clock, ArrowLeftRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface Bid {
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
}

const mockBids: Bid[] = [
  {
    id: "1",
    caseTitle: "Contract Dispute Resolution",
    amount: "$7,500",
    proposedTimeline: "3-4 months",
    bidDate: "2024-03-15",
    status: "pending",
    caseDetails: {
      description: "Complex contract dispute between two technology companies",
      location: "Sacramento, CA",
      practiceArea: "Business Law",
      deadline: "2024-04-01",
      budget: "$5,000 - $10,000"
    },
    bidDetails: {
      strategy: "Mediation-first approach with litigation preparation",
      availability: "Immediate start",
      proposedPaymentStructure: "50% upfront, 50% upon resolution"
    }
  },
  {
    id: "2",
    caseTitle: "Intellectual Property Case",
    amount: "$12,000",
    proposedTimeline: "6 months",
    bidDate: "2024-03-14",
    status: "countered",
    caseDetails: {
      description: "Patent infringement case in software industry",
      location: "San Francisco, CA",
      practiceArea: "IP Law",
      deadline: "2024-03-30",
      budget: "$10,000 - $15,000"
    },
    bidDetails: {
      strategy: "Aggressive IP protection strategy",
      availability: "Available within 1 week",
      proposedPaymentStructure: "Monthly retainer"
    }
  },
  {
    id: "3",
    caseTitle: "Employment Discrimination",
    amount: "$9,000",
    proposedTimeline: "4-5 months",
    bidDate: "2024-03-13",
    status: "accepted",
    caseDetails: {
      description: "Workplace discrimination case",
      location: "Los Angeles, CA",
      practiceArea: "Employment Law",
      deadline: "2024-03-25",
      budget: "$8,000 - $12,000"
    },
    bidDetails: {
      strategy: "Documentation review and negotiation",
      availability: "Start next week",
      proposedPaymentStructure: "Milestone-based payments"
    }
  }
]

export function MarketplaceStats() {
  const [selectedCategory, setSelectedCategory] = useState<"pending" | "countered" | "accepted" | null>(null)
  
  const pendingBids = mockBids.filter(bid => bid.status === "pending")
  const counterBids = mockBids.filter(bid => bid.status === "countered")
  const acceptedBids = mockBids.filter(bid => bid.status === "accepted")

  const stats = [
    {
      title: "Pending Bids",
      value: pendingBids.length.toString(),
      icon: Clock,
      category: "pending" as const,
      description: "Cases awaiting response"
    },
    {
      title: "Counter-Bids",
      value: counterBids.length.toString(),
      icon: ArrowLeftRight,
      category: "countered" as const,
      description: "Bids requiring negotiation"
    },
    {
      title: "Accepted Bids",
      value: acceptedBids.length.toString(),
      icon: CheckCircle2,
      category: "accepted" as const,
      description: "Successfully won cases"
    }
  ]

  const getBidsByCategory = (category: "pending" | "countered" | "accepted") => {
    return mockBids.filter(bid => bid.status === category)
  }

  const getDialogTitle = (category: "pending" | "countered" | "accepted") => {
    switch (category) {
      case "pending":
        return "Pending Bids"
      case "countered":
        return "Counter-Bids"
      case "accepted":
        return "Accepted Bids"
      default:
        return ""
    }
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card 
            key={stat.title}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedCategory(stat.category)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedCategory && getDialogTitle(selectedCategory)}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[600px]">
            <div className="space-y-4">
              {selectedCategory && getBidsByCategory(selectedCategory).map((bid) => (
                <Card key={bid.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{bid.caseTitle}</h3>
                      <Badge variant={
                        bid.status === "accepted" ? "default" :
                        bid.status === "countered" ? "secondary" : "outline"
                      }>
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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

                      <div>
                        <h4 className="font-medium mb-2">Case Details</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Description:</span> {bid.caseDetails.description}</p>
                          <p><span className="text-muted-foreground">Location:</span> {bid.caseDetails.location}</p>
                          <p><span className="text-muted-foreground">Practice Area:</span> {bid.caseDetails.practiceArea}</p>
                          <p><span className="text-muted-foreground">Deadline:</span> {bid.caseDetails.deadline}</p>
                          <p><span className="text-muted-foreground">Budget Range:</span> {bid.caseDetails.budget}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}