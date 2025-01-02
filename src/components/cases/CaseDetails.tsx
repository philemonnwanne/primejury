import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CaseOverview } from "./sections/CaseOverview"
import { LegalRepresentatives } from "./sections/LegalRepresentatives"
import { CaseLocation } from "./sections/CaseLocation"
import { SettlementOffers } from "./sections/SettlementOffers"
import { RelatedForms } from "./sections/RelatedForms"
import { PendingItems } from "./sections/PendingItems"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { CaseActionsDropdown } from "./CaseActionsDropdown"

interface CaseDetailsProps {
  caseId: string
}

export function CaseDetails({ caseId }: CaseDetailsProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<{ id: string; amount: string; action: 'accept' | 'reject' } | null>(null)
  const { toast } = useToast()

  // Mock data - in a real app, this would be fetched based on the caseId
  const caseDetails = {
    title: "Smith vs. Johnson",
    type: "Civil Litigation",
    estimatedDuration: "6-8 months",
    subject: "Contract dispute regarding construction project delays",
    lawyer: {
      name: "Sarah Parker",
      email: "sarah.parker@lawfirm.com",
      phone: "(555) 123-4567",
      id: "lawyer_id_1"
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

  const formDescriptions = {
    "Motion for Summary Judgment": "Used when seeking judgment without a full trial. Ideal for cases with clear evidence and no disputed material facts.",
    "Discovery Request": "Template for requesting evidence and information from opposing parties. Essential for gathering case-related documentation.",
    "Settlement Agreement Template": "Standard template for documenting settlement terms between parties. Useful when reaching an out-of-court resolution."
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{caseDetails.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary">{caseDetails.type}</Badge>
          <Badge variant="outline">{caseDetails.status}</Badge>
          <div className="ml-auto">
            <CaseActionsDropdown />
          </div>
        </div>
      </div>

      <PendingItems />

      <Separator />

      <CaseOverview 
        estimatedDuration={caseDetails.estimatedDuration}
        subject={caseDetails.subject}
        intakeFormId="intake_form_id_1"
      />

      <LegalRepresentatives 
        lawyer={caseDetails.lawyer}
        judge={caseDetails.judge}
      />

      <CaseLocation location={caseDetails.location} />

      <SettlementOffers offers={caseDetails.settlementOffers} />

      <RelatedForms 
        forms={caseDetails.relatedForms}
        formDescriptions={formDescriptions}
      />
    </div>
  )
}