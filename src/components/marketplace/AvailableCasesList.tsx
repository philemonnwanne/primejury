import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, AlertCircle, Search } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CaseDetailsDialog } from "./CaseDetailsDialog"
import { toast } from "sonner"

interface Case {
  id: string
  title: string
  type: string
  description: string
  location: string
  budget: string
  postedDate: string
  isUrgent: boolean
  fromJail: boolean
  status: string
  clientInfo?: {
    name: string
    contact: string
  }
  requirements?: string[]
  deadline?: string
  expectedOutcome?: string
}

const mockCases: Case[] = [
  {
    id: "1",
    title: "Criminal Defense Case",
    type: "Criminal",
    description: "Seeking immediate legal representation for a criminal defense case.",
    location: "Sacramento, CA",
    budget: "$5,000 - $10,000",
    postedDate: "2024-03-15",
    isUrgent: true,
    fromJail: true,
    status: "Open",
    clientInfo: {
      name: "John Doe",
      contact: "Through Facility"
    },
    requirements: [
      "Experience in criminal defense",
      "Available for immediate consultation",
      "Familiar with local court system"
    ],
    deadline: "2024-03-22",
    expectedOutcome: "Case dismissal or reduced charges"
  },
  {
    id: "2",
    title: "Family Custody Dispute",
    type: "Family",
    description: "Need representation for an urgent family custody case.",
    location: "Los Angeles, CA",
    budget: "$3,000 - $7,000",
    postedDate: "2024-03-14",
    isUrgent: true,
    fromJail: false,
    status: "Open",
    clientInfo: {
      name: "Jane Smith",
      contact: "jane.smith@email.com"
    },
    requirements: [
      "Family law expertise",
      "Experience with custody battles",
      "Mediation skills"
    ],
    deadline: "2024-03-25",
    expectedOutcome: "Fair custody arrangement"
  }
]

export function AvailableCasesList() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)

  const handleBidSubmitted = (caseId: string) => {
    toast.success("Bid submitted successfully")
    // In a real app, this would update the case status in the backend
    // and refresh the available cases list
  }

  return (
    <>
      <ScrollArea className="h-[600px]">
        <div className="space-y-4 p-4">
          {mockCases.map((case_) => (
            <Card key={case_.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{case_.title}</CardTitle>
                    {case_.fromJail && (
                      <Lock className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    {case_.isUrgent && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Urgent
                      </Badge>
                    )}
                    <Badge variant="outline">{case_.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{case_.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm"><span className="font-medium">Location:</span> {case_.location}</p>
                      <p className="text-sm"><span className="font-medium">Budget:</span> {case_.budget}</p>
                      <p className="text-sm"><span className="font-medium">Posted:</span> {new Date(case_.postedDate).toLocaleDateString()}</p>
                    </div>
                    <Button onClick={() => setSelectedCase(case_)}>View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <CaseDetailsDialog
        case_={selectedCase}
        onClose={() => setSelectedCase(null)}
        onBidSubmitted={handleBidSubmitted}
      />
    </>
  )
}