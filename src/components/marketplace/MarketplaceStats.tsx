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
    status: "pending" as const,
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
    caseTitle: "Family Law Case",
    amount: "$5,000",
    proposedTimeline: "2-3 months",
    bidDate: "2024-03-16",
    status: "pending" as const,
    caseDetails: {
      description: "Divorce proceedings with asset division",
      location: "Los Angeles, CA",
      practiceArea: "Family Law",
      deadline: "2024-04-15",
      budget: "$4,000 - $6,000"
    },
    bidDetails: {
      strategy: "Collaborative divorce approach",
      availability: "Start within 1 week",
      proposedPaymentStructure: "Monthly installments"
    },
    clientDetails: {
      name: "Mary Johnson",
      email: "mary.j@email.com",
      phone: "(555) 234-5678",
      address: "456 Oak St, Los Angeles, CA 90012",
      occupation: "Teacher"
    }
  },
  {
    id: "3",
    caseTitle: "Real Estate Dispute",
    amount: "$8,500",
    proposedTimeline: "4-5 months",
    bidDate: "2024-03-14",
    status: "pending" as const,
    caseDetails: {
      description: "Property boundary dispute",
      location: "San Francisco, CA",
      practiceArea: "Real Estate Law",
      deadline: "2024-04-30",
      budget: "$7,000 - $10,000"
    },
    bidDetails: {
      strategy: "Negotiation with potential litigation",
      availability: "Immediate start",
      proposedPaymentStructure: "40% upfront, 60% on completion"
    },
    clientDetails: {
      name: "Robert Wilson",
      email: "robert.w@email.com",
      phone: "(555) 345-6789",
      address: "789 Pine St, San Francisco, CA 94105",
      occupation: "Real Estate Developer"
    }
  },
  {
    id: "4",
    caseTitle: "Employment Discrimination",
    amount: "$6,500",
    proposedTimeline: "3-4 months",
    bidDate: "2024-03-13",
    status: "pending" as const,
    caseDetails: {
      description: "Workplace discrimination case",
      location: "San Diego, CA",
      practiceArea: "Employment Law",
      deadline: "2024-04-20",
      budget: "$5,000 - $8,000"
    },
    bidDetails: {
      strategy: "Documentation review and negotiation",
      availability: "Start next week",
      proposedPaymentStructure: "Milestone-based payments"
    },
    clientDetails: {
      name: "Sarah Chen",
      email: "sarah.c@email.com",
      phone: "(555) 456-7890",
      address: "101 Beach Dr, San Diego, CA 92101",
      occupation: "Software Engineer"
    }
  },
  {
    id: "5",
    caseTitle: "Personal Injury Case",
    amount: "$9,000",
    proposedTimeline: "5-6 months",
    bidDate: "2024-03-12",
    status: "pending" as const,
    caseDetails: {
      description: "Auto accident injury case",
      location: "Oakland, CA",
      practiceArea: "Personal Injury",
      deadline: "2024-04-10",
      budget: "$8,000 - $12,000"
    },
    bidDetails: {
      strategy: "Evidence gathering and settlement negotiation",
      availability: "Immediate start",
      proposedPaymentStructure: "Contingency fee"
    },
    clientDetails: {
      name: "David Brown",
      email: "david.b@email.com",
      phone: "(555) 567-8901",
      address: "202 Lake Ave, Oakland, CA 94601",
      occupation: "Construction Worker"
    }
  },
  {
    id: "6",
    caseTitle: "Business Formation",
    amount: "$4,500",
    proposedTimeline: "2-3 months",
    bidDate: "2024-03-11",
    status: "pending" as const,
    caseDetails: {
      description: "Startup company formation and documentation",
      location: "San Jose, CA",
      practiceArea: "Business Law",
      deadline: "2024-04-05",
      budget: "$4,000 - $6,000"
    },
    bidDetails: {
      strategy: "Comprehensive business structure setup",
      availability: "Start within 2 weeks",
      proposedPaymentStructure: "Fixed fee"
    },
    clientDetails: {
      name: "Lisa Martinez",
      email: "lisa.m@email.com",
      phone: "(555) 678-9012",
      address: "303 Tech Blvd, San Jose, CA 95110",
      occupation: "Entrepreneur"
    }
  },
  {
    id: "7",
    caseTitle: "Intellectual Property Case",
    amount: "$12,000",
    proposedTimeline: "6 months",
    bidDate: "2024-03-14",
    status: "countered" as const,
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
    id: "8",
    caseTitle: "Trademark Dispute",
    amount: "$9,500",
    proposedTimeline: "4 months",
    bidDate: "2024-03-13",
    status: "countered" as const,
    caseDetails: {
      description: "Trademark infringement in retail industry",
      location: "Los Angeles, CA",
      practiceArea: "IP Law",
      deadline: "2024-04-15",
      budget: "$8,000 - $12,000"
    },
    bidDetails: {
      strategy: "Negotiation with litigation backup",
      availability: "Immediate start",
      proposedPaymentStructure: "50% upfront, 50% on resolution"
    },
    clientDetails: {
      name: "Michael Chang",
      email: "michael.c@email.com",
      phone: "(555) 345-6789",
      address: "789 Market St, Los Angeles, CA 90015",
      occupation: "Retail Business Owner"
    },
    counterOffer: {
      amount: "$8,800",
      timeline: "3.5 months",
      additionalNotes: "Requesting faster resolution and adjusted payment terms"
    }
  },
  {
    id: "9",
    caseTitle: "Copyright Infringement",
    amount: "$7,500",
    proposedTimeline: "3 months",
    bidDate: "2024-03-12",
    status: "countered" as const,
    caseDetails: {
      description: "Digital media copyright case",
      location: "San Diego, CA",
      practiceArea: "IP Law",
      deadline: "2024-04-20",
      budget: "$6,000 - $9,000"
    },
    bidDetails: {
      strategy: "DMCA enforcement and settlement",
      availability: "Start next week",
      proposedPaymentStructure: "Monthly payments"
    },
    clientDetails: {
      name: "Emma Wilson",
      email: "emma.w@email.com",
      phone: "(555) 456-7890",
      address: "101 Digital Ave, San Diego, CA 92103",
      occupation: "Digital Content Creator"
    },
    counterOffer: {
      amount: "$7,000",
      timeline: "2.5 months",
      additionalNotes: "Requesting expedited timeline with reduced scope"
    }
  },
  {
    id: "10",
    caseTitle: "Trade Secret Case",
    amount: "$15,000",
    proposedTimeline: "5 months",
    bidDate: "2024-03-11",
    status: "countered" as const,
    caseDetails: {
      description: "Trade secret misappropriation",
      location: "Silicon Valley, CA",
      practiceArea: "IP Law",
      deadline: "2024-05-01",
      budget: "$12,000 - $18,000"
    },
    bidDetails: {
      strategy: "Immediate injunctive relief",
      availability: "Priority handling",
      proposedPaymentStructure: "Retainer with monthly billing"
    },
    clientDetails: {
      name: "James Lee",
      email: "james.l@email.com",
      phone: "(555) 567-8901",
      address: "202 Tech Park, Mountain View, CA 94041",
      occupation: "Tech Company CTO"
    },
    counterOffer: {
      amount: "$13,500",
      timeline: "4 months",
      additionalNotes: "Requesting more aggressive timeline with adjusted strategy"
    }
  },
  {
    id: "11",
    caseTitle: "Patent Portfolio",
    amount: "$18,000",
    proposedTimeline: "6 months",
    bidDate: "2024-03-10",
    status: "countered" as const,
    caseDetails: {
      description: "Multiple patent enforcement cases",
      location: "San Jose, CA",
      practiceArea: "IP Law",
      deadline: "2024-05-15",
      budget: "$15,000 - $20,000"
    },
    bidDetails: {
      strategy: "Portfolio-wide enforcement strategy",
      availability: "Dedicated team",
      proposedPaymentStructure: "Milestone-based payments"
    },
    clientDetails: {
      name: "Thomas Anderson",
      email: "thomas.a@email.com",
      phone: "(555) 678-9012",
      address: "303 Innovation Dr, San Jose, CA 95134",
      occupation: "R&D Director"
    },
    counterOffer: {
      amount: "$16,500",
      timeline: "5 months",
      additionalNotes: "Requesting phased approach with revised payment structure"
    }
  },
  {
    id: "12",
    caseTitle: "Software License Dispute",
    amount: "$11,000",
    proposedTimeline: "4 months",
    bidDate: "2024-03-09",
    status: "countered" as const,
    caseDetails: {
      description: "Enterprise software licensing dispute",
      location: "Sacramento, CA",
      practiceArea: "IP Law",
      deadline: "2024-04-30",
      budget: "$10,000 - $13,000"
    },
    bidDetails: {
      strategy: "License audit and negotiation",
      availability: "Start within 1 week",
      proposedPaymentStructure: "Fixed fee with milestones"
    },
    clientDetails: {
      name: "Rachel Kim",
      email: "rachel.k@email.com",
      phone: "(555) 789-0123",
      address: "404 Software Blvd, Sacramento, CA 95814",
      occupation: "Software Company CEO"
    },
    counterOffer: {
      amount: "$10,200",
      timeline: "3.5 months",
      additionalNotes: "Requesting focused scope with earlier completion date"
    }
  },
  {
    id: "13",
    caseTitle: "Employment Discrimination",
    amount: "$9,000",
    proposedTimeline: "4-5 months",
    bidDate: "2024-03-13",
    status: "accepted" as const,
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
  },
  {
    id: "14",
    caseTitle: "Corporate Merger",
    amount: "$25,000",
    proposedTimeline: "6-8 months",
    bidDate: "2024-03-12",
    status: "accepted" as const,
    caseDetails: {
      description: "Complex corporate merger case",
      location: "San Francisco, CA",
      practiceArea: "Corporate Law",
      deadline: "2024-09-30",
      budget: "$20,000 - $30,000"
    },
    bidDetails: {
      strategy: "Comprehensive merger documentation and compliance",
      availability: "Dedicated team",
      proposedPaymentStructure: "Phased payments"
    },
    clientDetails: {
      name: "Jennifer Chen",
      email: "jennifer.c@email.com",
      phone: "(555) 456-7890",
      address: "505 Market St, San Francisco, CA 94105",
      occupation: "CEO"
    }
  },
  {
    id: "15",
    caseTitle: "Real Estate Development",
    amount: "$15,000",
    proposedTimeline: "5-6 months",
    bidDate: "2024-03-11",
    status: "accepted" as const,
    caseDetails: {
      description: "Commercial real estate development project",
      location: "San Diego, CA",
      practiceArea: "Real Estate Law",
      deadline: "2024-08-15",
      budget: "$12,000 - $18,000"
    },
    bidDetails: {
      strategy: "Comprehensive development agreement review",
      availability: "Immediate start",
      proposedPaymentStructure: "Monthly retainer"
    },
    clientDetails: {
      name: "David Martinez",
      email: "david.m@email.com",
      phone: "(555) 567-8901",
      address: "606 Development Dr, San Diego, CA 92101",
      occupation: "Real Estate Developer"
    }
  },
  {
    id: "16",
    caseTitle: "Patent Application",
    amount: "$12,000",
    proposedTimeline: "4-5 months",
    bidDate: "2024-03-10",
    status: "accepted" as const,
    caseDetails: {
      description: "Technology patent application",
      location: "Silicon Valley, CA",
      practiceArea: "IP Law",
      deadline: "2024-07-20",
      budget: "$10,000 - $15,000"
    },
    bidDetails: {
      strategy: "Comprehensive patent search and application",
      availability: "Start within 1 week",
      proposedPaymentStructure: "Fixed fee with milestones"
    },
    clientDetails: {
      name: "Steven Park",
      email: "steven.p@email.com",
      phone: "(555) 678-9012",
      address: "707 Innovation Way, Mountain View, CA 94041",
      occupation: "Tech Entrepreneur"
    }
  },
  {
    id: "17",
    caseTitle: "Business Contract Review",
    amount: "$8,000",
    proposedTimeline: "2-3 months",
    bidDate: "2024-03-09",
    status: "accepted" as const,
    caseDetails: {
      description: "International business contract review",
      location: "Sacramento, CA",
      practiceArea: "Business Law",
      deadline: "2024-05-30",
      budget: "$7,000 - $10,000"
    },
    bidDetails: {
      strategy: "Detailed contract analysis and negotiation",
      availability: "Flexible schedule",
      proposedPaymentStructure: "50% upfront, 50% on completion"
    },
    clientDetails: {
      name: "Laura Thompson",
      email: "laura.t@email.com",
      phone: "(555) 789-0123",
      address: "808 Business Park, Sacramento, CA 95814",
      occupation: "Import/Export Business Owner"
    }
  },
  {
    id: "18",
    caseTitle: "Environmental Compliance",
    amount: "$20,000",
    proposedTimeline: "6-7 months",
    bidDate: "2024-03-08",
    status: "accepted" as const,
    caseDetails: {
      description: "Environmental compliance audit and implementation",
      location: "Oakland, CA",
      practiceArea: "Environmental Law",
      deadline: "2024-10-15",
      budget: "$18,000 - $25,000"
    },
    bidDetails: {
      strategy: "Comprehensive compliance review and implementation",
      availability: "Dedicated team",
      proposedPaymentStructure: "Quarterly payments"
    },
    clientDetails: {
      name: "Robert Garcia",
      email: "robert.g@email.com",
      phone: "(555) 890-1234",
      address: "909 Industrial Blvd, Oakland, CA 94601",
      occupation: "Manufacturing Plant Manager"
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