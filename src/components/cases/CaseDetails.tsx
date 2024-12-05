import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { FileText, Upload, DollarSign } from "lucide-react"
import { CaseOverview } from "./sections/CaseOverview"
import { LegalRepresentatives } from "./sections/LegalRepresentatives"
import { CaseLocation } from "./sections/CaseLocation"

interface CaseDetailsProps {
  caseId: string
}

export function CaseDetails({ caseId }: CaseDetailsProps) {
  // Mock data - in a real app, this would be fetched based on the caseId
  const caseDetails = {
    title: "Smith vs. Johnson",
    type: "Civil Litigation",
    estimatedDuration: "6-8 months",
    subject: "Contract dispute regarding construction project delays",
    lawyer: {
      name: "Sarah Parker",
      email: "sarah.parker@lawfirm.com",
      phone: "(555) 123-4567"
    },
    judge: "Hon. Michael Roberts",
    location: {
      city: "Sacramento",
      state: "California",
      county: "Sacramento",
      courthouse: {
        name: "Sacramento County Superior Court",
        address: "720 9th Street, Sacramento, CA 95814",
        phone: "(916) 874-5522"
      }
    },
    status: "active",
    priority: "high",
    filingDate: "2024-01-15",
    nextHearing: "2024-03-20",
    documents: [
      { id: "1", title: "Initial Complaint", type: "Legal Filing", date: "2024-01-15" },
      { id: "2", title: "Response to Complaint", type: "Legal Filing", date: "2024-02-01" },
      { id: "3", title: "Evidence Package A", type: "Evidence", date: "2024-02-15" }
    ],
    settlementOffers: [
      { id: "1", amount: "$75,000", status: "pending", date: "2024-02-20" },
      { id: "2", amount: "$50,000", status: "rejected", date: "2024-01-30" }
    ],
    relatedForms: [
      { id: "1", title: "Motion for Summary Judgment", category: "Civil Procedure" },
      { id: "2", title: "Discovery Request", category: "Evidence" },
      { id: "3", title: "Settlement Agreement Template", category: "Settlement" }
    ]
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{caseDetails.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary">{caseDetails.type}</Badge>
          <Badge variant="outline">{caseDetails.status}</Badge>
        </div>
      </div>

      <Separator />

      <CaseOverview 
        estimatedDuration={caseDetails.estimatedDuration}
        subject={caseDetails.subject}
      />

      <LegalRepresentatives 
        lawyer={caseDetails.lawyer}
        judge={caseDetails.judge}
      />

      <CaseLocation location={caseDetails.location} />

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Case-related documents and files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {caseDetails.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-sm text-muted-foreground">{doc.type} - {doc.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          ))}
          <Button className="w-full" variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Document
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settlement Offers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {caseDetails.settlementOffers.map((offer) => (
            <div
              key={offer.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{offer.amount}</p>
                  <p className="text-sm text-muted-foreground">
                    {offer.date} - {offer.status}
                  </p>
                </div>
              </div>
              <Badge variant={offer.status === "pending" ? "default" : "secondary"}>
                {offer.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Forms</CardTitle>
          <CardDescription>Forms and templates for your case</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {caseDetails.relatedForms.map((form) => (
            <div
              key={form.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{form.title}</p>
                <p className="text-sm text-muted-foreground">{form.category}</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}