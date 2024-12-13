import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { toast } from "sonner"
import { MarketplaceStats } from "./MarketplaceStats"
import { MarketplaceCaseCard } from "./MarketplaceCaseCard"
import { MarketplaceBidDialog } from "./MarketplaceBidDialog"

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

    toast.success("Bid submitted successfully")
    setShowBidDialog(false)
    setBidAmount("")
    setProposedTimeline("")
    setBidDetails("")
  }

  return (
    <div className="space-y-4">
      <MarketplaceStats totalCases={mockCases.length} />
      
      {mockCases.map((case_) => (
        <MarketplaceCaseCard
          key={case_.id}
          case_={case_}
          onClick={() => setSelectedCase(case_)}
        />
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
            <button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
              onClick={() => {
                setSelectedCase(null)
                setShowBidDialog(true)
              }}
            >
              Place Bid
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <MarketplaceBidDialog
        open={showBidDialog}
        onOpenChange={setShowBidDialog}
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
        proposedTimeline={proposedTimeline}
        setProposedTimeline={setProposedTimeline}
        bidDetails={bidDetails}
        setBidDetails={setBidDetails}
        onSubmit={handleBidSubmit}
      />
    </div>
  )
}
