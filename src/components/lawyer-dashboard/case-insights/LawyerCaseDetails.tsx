import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CaseTimeline } from "@/components/cases/CaseTimeline"
import { CaseOverviewTab } from "./sections/CaseOverviewTab"
import { DocumentsTab } from "./sections/DocumentsTab"
import { BillingTab } from "./sections/BillingTab"

interface LawyerCaseDetailsProps {
  caseId: string
}

export function LawyerCaseDetails({ caseId }: LawyerCaseDetailsProps) {
  // Mock data - in a real app, this would be fetched based on the caseId
  const caseDetails = {
    title: "Smith vs. Johnson",
    type: "civil",
    status: "active",
    priority: "high",
    description: "Contract dispute regarding construction project delays",
    estimatedDuration: "6-8 months",
    subject: "Contract dispute regarding construction project delays",
    filingDate: "2024-01-15",
    nextHearing: "2024-03-20",
  }

  const mockTimelineEvents = [
    {
      date: "2024-03-15",
      title: "Initial Consultation",
      description: "First meeting with client to discuss case details",
      status: "completed" as const,
      details: {
        lawyerNotes: "Client provided initial documentation. Need to follow up on medical records.",
      }
    },
    {
      date: "2024-03-20",
      title: "Document Collection",
      description: "Gathering necessary documentation from client",
      status: "current" as const,
      details: {
        evidenceRequests: [
          {
            id: "1",
            description: "Medical records from Primary Care Physician",
            status: "pending" as const,
            dueDate: "2024-03-25"
          }
        ]
      }
    }
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <CaseOverviewTab initialData={caseDetails} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>

        <TabsContent value="timeline">
          <CaseTimeline events={mockTimelineEvents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}