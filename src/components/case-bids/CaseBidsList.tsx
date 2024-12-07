import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Calendar, DollarSign, Users, Edit2, Lock } from "lucide-react"
import { toast } from "sonner"

export function CaseBidsList() {
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedCase, setEditedCase] = useState<any>(null)

  const activeCases = [
    {
      id: 1,
      title: "Contract Dispute Resolution",
      type: "Civil Litigation",
      description: "Seeking legal representation for a contract dispute with a former business partner.",
      detailedDescription: "The dispute arose from a breach of partnership agreement signed in January 2023. Multiple attempts at mediation have failed, and we're now seeking legal intervention.",
      budget: "$5,000 - $10,000",
      bidsCount: 3,
      status: "Active",
      postedDate: "2024-03-10",
      documents: ["partnership_agreement.pdf", "mediation_records.pdf"],
      timeline: "Within 3 months",
      location: "Sacramento, CA",
      disputeValue: "$75,000",
      priorAttempts: "Two mediation sessions in Feb 2024",
      preferredCommunication: "Email and Phone",
      bids: [
        {
          id: 1,
          lawyerName: "Sarah Parker",
          lawyerId: "sarah-parker",
          amount: "$7,500",
          proposedTimeline: "3 months",
          bidDate: "2024-03-11",
        },
        {
          id: 2,
          lawyerName: "Michael Chang",
          lawyerId: "michael-chang",
          amount: "$6,800",
          proposedTimeline: "4 months",
          bidDate: "2024-03-12",
        }
      ]
    },
    // Add more mock cases as needed
  ]

  const handleEdit = (caseData: any) => {
    if (caseData.bids && caseData.bids.length > 0) {
      toast.error("Cannot edit case after receiving bids")
      return
    }
    setEditedCase({ ...caseData })
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically make an API call to update the case
    toast.success("Case updated successfully")
    setIsEditing(false)
    setEditedCase(null)
  }

  return (
    <>
      <div className="space-y-4">
        {activeCases.map((caseItem) => (
          <Card 
            key={caseItem.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedCase(caseItem)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{caseItem.title}</CardTitle>
                <Badge>{caseItem.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Case Type</p>
                    <p>{caseItem.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget Range</p>
                    <p>{caseItem.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Posted Date</p>
                    <p>{new Date(caseItem.postedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Bids Received</p>
                    <p>{caseItem.bidsCount}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="mt-1 line-clamp-2">{caseItem.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedCase?.title}</span>
              <div className="flex items-center gap-2">
                <Badge>{selectedCase?.status}</Badge>
                {selectedCase?.bids?.length === 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(selectedCase)
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
                {selectedCase?.bids?.length > 0 && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </DialogTitle>
            <DialogDescription>
              Posted on {selectedCase?.postedDate && new Date(selectedCase.postedDate).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[600px]">
            {!isEditing ? (
              <div className="space-y-6 p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Budget Range</span>
                    </div>
                    <p>{selectedCase?.budget}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Timeline</span>
                    </div>
                    <p>{selectedCase?.timeline}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Detailed Description</span>
                  </div>
                  <p className="text-muted-foreground">{selectedCase?.detailedDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="font-medium">Location</span>
                    <p>{selectedCase?.location}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-medium">Dispute Value</span>
                    <p>{selectedCase?.disputeValue}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-medium">Prior Resolution Attempts</span>
                  <p className="text-muted-foreground">{selectedCase?.priorAttempts}</p>
                </div>

                {selectedCase?.bids && selectedCase.bids.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Received Bids</span>
                    </div>
                    <div className="space-y-4">
                      {selectedCase.bids.map((bid: any) => (
                        <Card key={bid.id}>
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <a 
                                  href={`/lawyers/${bid.lawyerId}`}
                                  className="text-primary hover:underline font-medium"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {bid.lawyerName}
                                </a>
                                <Badge variant="outline">{bid.amount}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <p>Proposed Timeline: {bid.proposedTimeline}</p>
                                <p>Bid Date: {new Date(bid.bidDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <span className="font-medium">Attached Documents</span>
                  <div className="space-y-2">
                    {selectedCase?.documents.map((doc: string) => (
                      <Button key={doc} variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        {doc}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 p-4">
                <div className="space-y-2">
                  <label className="font-medium">Title</label>
                  <Input 
                    value={editedCase?.title} 
                    onChange={(e) => setEditedCase({ ...editedCase, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Description</label>
                  <Textarea 
                    value={editedCase?.description}
                    onChange={(e) => setEditedCase({ ...editedCase, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Budget Range</label>
                  <Input 
                    value={editedCase?.budget}
                    onChange={(e) => setEditedCase({ ...editedCase, budget: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Timeline</label>
                  <Input 
                    value={editedCase?.timeline}
                    onChange={(e) => setEditedCase({ ...editedCase, timeline: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">Save Changes</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false)
                      setEditedCase(null)
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}