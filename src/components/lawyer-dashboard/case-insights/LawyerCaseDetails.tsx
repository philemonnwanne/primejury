import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CaseTimeline } from "@/components/cases/CaseTimeline"
import { Pencil, Eye } from "lucide-react"
import { CaseOverviewTab } from "./tabs/CaseOverviewTab"
import { DocumentsTab } from "./tabs/DocumentsTab"
import { BillingTab } from "./tabs/BillingTab"

interface LawyerCaseDetailsProps {
  caseId: string
}

export function LawyerCaseDetails({ caseId }: LawyerCaseDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)

  // Mock data - in a real app, this would be fetched based on the caseId
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

  const mockCaseData = {
    title: "Smith vs. Johnson",
    type: "civil",
    status: "active",
    priority: "high",
    description: "Contract dispute regarding construction project delays",
  }

  const mockBillingData = {
    billingType: "hourly",
    rate: "250",
    schedule: "monthly",
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <Eye className="h-4 w-4" />
              View Mode
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              Edit Mode
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <CaseOverviewTab isEditing={isEditing} caseData={mockCaseData} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="billing">
          <BillingTab isEditing={isEditing} initialData={mockBillingData} />
        </TabsContent>

        <TabsContent value="timeline">
          <CaseTimeline events={mockTimelineEvents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}