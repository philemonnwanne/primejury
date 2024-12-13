import { Clock, ArrowLeftRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { PendingBidCard } from "./bid-details/PendingBidCard"
import { CounterBidCard } from "./bid-details/CounterBidCard"
import { AcceptedBidCard } from "./bid-details/AcceptedBidCard"

// Mock data with extended client details and counter offers
const mockBids = [
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
    },
    clientDetails: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Sacramento, CA 95814",
      occupation: "Business Owner"
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
    },
    clientDetails: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      address: "456 Oak Ave, San Francisco, CA 94105",
      occupation: "Tech Startup CEO"
    },
    counterOffer: {
      amount: "$10,500",
      timeline: "5 months",
      additionalNotes: "Would like to expedite the timeline and adjust the fee structure"
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
    },
    clientDetails: {
      name: "Michael Brown",
      email: "michael.b@email.com",
      phone: "(555) 345-6789",
      address: "789 Pine St, Los Angeles, CA 90012",
      occupation: "Restaurant Owner"
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
              {selectedCategory === "pending" && 
                pendingBids.map(bid => (
                  <PendingBidCard key={bid.id} bid={bid} />
                ))
              }
              {selectedCategory === "countered" && 
                counterBids.map(bid => (
                  <CounterBidCard key={bid.id} bid={bid as any} />
                ))
              }
              {selectedCategory === "accepted" && 
                acceptedBids.map(bid => (
                  <AcceptedBidCard key={bid.id} bid={bid} />
                ))
              }
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}