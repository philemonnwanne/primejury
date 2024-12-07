import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, DollarSign, Users } from "lucide-react"

export function CaseBidsList() {
  const [selectedCase, setSelectedCase] = useState<any>(null)

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
    },
    // Add more mock cases as needed
  ]

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
              <Badge>{selectedCase?.status}</Badge>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[600px]">
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

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Bids Received</span>
                </div>
                <p>{selectedCase?.bidsCount} lawyers have placed bids</p>
              </div>

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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}