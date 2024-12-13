import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Calendar, DollarSign, MapPin } from "lucide-react"
import { toast } from "sonner"

const mockCases = [
  {
    id: "1",
    title: "Contract Dispute Resolution",
    type: "Civil Litigation",
    description: "Seeking legal representation for a contract dispute with a former business partner.",
    budget: "$5,000 - $10,000",
    location: "Sacramento, CA",
    postedDate: "2024-12-15",
    deadline: "2024-12-30",
    isProBono: false,
    status: "Open"
  },
  {
    id: "2",
    title: "Family Law Consultation",
    type: "Family Law",
    description: "Need legal assistance with divorce proceedings and child custody arrangements.",
    budget: "$3,000 - $7,000",
    location: "San Francisco, CA",
    postedDate: "2024-12-14",
    deadline: "2024-12-29",
    isProBono: false,
    status: "Open"
  },
  {
    id: "3",
    title: "Pro Bono Immigration Case",
    type: "Immigration",
    description: "Assistance needed for asylum application and documentation.",
    budget: "Pro Bono",
    location: "Los Angeles, CA",
    postedDate: "2024-12-13",
    deadline: "2024-12-28",
    isProBono: true,
    status: "Open"
  }
]

export function MarketplaceCaseList() {
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [showBidDialog, setShowBidDialog] = useState(false)
  const [bidAmount, setBidAmount] = useState("")
  const [proposedTimeline, setProposedTimeline] = useState("")
  const [bidDetails, setBidDetails] = useState("")

  const handleBidSubmit = () => {
    if (!bidAmount || !proposedTimeline || !bidDetails) {
      toast.error("Please fill in all bid details")
      return
    }

    // Here you would typically make an API call to submit the bid
    toast.success("Bid submitted successfully")
    setShowBidDialog(false)
    setBidAmount("")
    setProposedTimeline("")
    setBidDetails("")
  }

  return (
    <div className="space-y-4">
      {mockCases.map((case_) => (
        <Card 
          key={case_.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setSelectedCase(case_)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{case_.title}</CardTitle>
              <div className="flex gap-2">
                {case_.isProBono && (
                  <Badge variant="secondary">Pro Bono</Badge>
                )}
                <Badge>{case_.status}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{case_.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{case_.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{case_.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due by {new Date(case_.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{case_.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedCase?.title}</DialogTitle>
            <DialogDescription>
              Posted on {selectedCase?.postedDate && new Date(selectedCase.postedDate).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Case Type</p>
                <p className="text-sm text-muted-foreground">{selectedCase?.type}</p>
              </div>
              <div>
                <p className="font-medium">Budget</p>
                <p className="text-sm text-muted-foreground">{selectedCase?.budget}</p>
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{selectedCase?.location}</p>
              </div>
              <div>
                <p className="font-medium">Deadline</p>
                <p className="text-sm text-muted-foreground">
                  {selectedCase?.deadline && new Date(selectedCase.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium">Description</p>
              <p className="text-sm text-muted-foreground">{selectedCase?.description}</p>
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                setSelectedCase(null)
                setShowBidDialog(true)
              }}
            >
              Place Bid
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBidDialog} onOpenChange={setShowBidDialog}>
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
            <Button className="w-full" onClick={handleBidSubmit}>
              Submit Bid
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}