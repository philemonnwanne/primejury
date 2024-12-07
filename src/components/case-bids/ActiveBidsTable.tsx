import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { Briefcase, Clock, Calendar, Star, Award, MessageSquare } from "lucide-react"

export function ActiveBidsTable() {
  const [selectedBid, setSelectedBid] = useState<any>(null)

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
      experience: "15 years in contract law",
      successRate: "89%",
      similarCases: 45,
      strategy: "Based on the details provided, I would approach this case by first reviewing all partnership agreements and mediation records. My strategy would involve:",
      strategyPoints: [
        "Thorough analysis of the breach of contract claims",
        "Assessment of damages and potential recovery",
        "Exploration of alternative dispute resolution options",
        "Preparation for potential litigation if needed"
      ],
      availability: "Available for immediate consultation",
      credentials: [
        "California Bar Association",
        "Certified Mediator",
        "Contract Law Specialist"
      ],
      proposedPaymentStructure: "50% upfront, 50% upon resolution",
      additionalNotes: "I've successfully handled similar partnership disputes and can provide references upon request.",
      rating: 4.8,
      reviewCount: 127,
    },
    {
      id: 2,
      lawyerId: "michael-rodriguez",
      lawyerName: "Michael Rodriguez",
      caseTitle: "Contract Dispute Resolution",
      amount: "$6,800",
      proposedTimeline: "2-3 months",
      status: "Pending",
      bidDate: "2024-03-13",
      experience: "12 years in business litigation",
      successRate: "92%",
      similarCases: 38,
      strategy: "My approach would focus on swift resolution through strategic negotiation and mediation:",
      strategyPoints: [
        "Initial comprehensive case evaluation",
        "Development of strong negotiating position",
        "Strategic use of mediation techniques",
        "Cost-effective dispute resolution path"
      ],
      availability: "Can start within one week",
      credentials: [
        "State Bar of California",
        "Business Law Specialist",
        "AAA Certified Arbitrator"
      ],
      proposedPaymentStructure: "Monthly installments available",
      additionalNotes: "Specialized in quick, cost-effective dispute resolutions with high success rate in mediation.",
      rating: 4.6,
      reviewCount: 98,
    },
    {
      id: 3,
      lawyerId: "jennifer-chen",
      lawyerName: "Jennifer Chen",
      caseTitle: "Contract Dispute Resolution",
      amount: "$8,200",
      proposedTimeline: "4-5 months",
      status: "Pending",
      bidDate: "2024-03-14",
      experience: "18 years in commercial litigation",
      successRate: "94%",
      similarCases: 62,
      strategy: "I propose a comprehensive approach focusing on both immediate resolution and long-term business relationship preservation:",
      strategyPoints: [
        "Detailed contract analysis and precedent review",
        "Multi-phase negotiation strategy",
        "Risk assessment and mitigation planning",
        "Business relationship preservation tactics"
      ],
      availability: "Available for immediate start",
      credentials: [
        "Commercial Law Specialist",
        "Harvard Law School Graduate",
        "Former Corporate Counsel"
      ],
      proposedPaymentStructure: "Flexible payment plans available, including success-based fees",
      additionalNotes: "Strong track record in preserving business relationships while resolving disputes effectively.",
      rating: 4.9,
      reviewCount: 156,
    }
  ]

  const handleBidAction = (bidId: number, action: 'accept' | 'decline' | 'counter') => {
    const actionMessages = {
      accept: "Bid accepted successfully",
      decline: "Bid declined",
      counter: "Counter offer sent",
    }
    toast.success(actionMessages[action])
    setSelectedBid(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Received Bids</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bids.map((bid) => (
              <div 
                key={bid.id} 
                className="border rounded-lg p-4 space-y-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedBid(bid)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{bid.caseTitle}</h3>
                    <Link 
                      to={`/lawyers/${bid.lawyerId}`}
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedBid} onOpenChange={() => setSelectedBid(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Bid Details</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[600px]">
            <div className="space-y-6 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedBid?.caseTitle}</h3>
                  <Link 
                    to={`/lawyers/${selectedBid?.lawyerId}`}
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Briefcase className="h-4 w-4" />
                    {selectedBid?.lawyerName}
                  </Link>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium">{selectedBid?.rating}</span>
                    <span className="text-muted-foreground">({selectedBid?.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <p>{selectedBid?.experience}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedBid?.similarCases} similar cases handled
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Proposed Timeline</span>
                  </div>
                  <p>{selectedBid?.proposedTimeline}</p>
                  <p className="text-sm text-muted-foreground">{selectedBid?.availability}</p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-medium">Proposed Strategy</span>
                <p className="text-muted-foreground">{selectedBid?.strategy}</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {selectedBid?.strategyPoints.map((point: string) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-medium">Credentials</span>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {selectedBid?.credentials.map((credential: string) => (
                    <li key={credential}>{credential}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-medium">Payment Structure</span>
                <p className="text-muted-foreground">{selectedBid?.proposedPaymentStructure}</p>
              </div>

              <div className="space-y-2">
                <span className="font-medium">Additional Notes</span>
                <p className="text-muted-foreground">{selectedBid?.additionalNotes}</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="default"
                  onClick={() => handleBidAction(selectedBid?.id, 'accept')}
                  className="flex-1"
                >
                  Accept Bid
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleBidAction(selectedBid?.id, 'counter')}
                  className="flex-1"
                >
                  Counter Offer
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleBidAction(selectedBid?.id, 'decline')}
                  className="flex-1"
                >
                  Decline
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}