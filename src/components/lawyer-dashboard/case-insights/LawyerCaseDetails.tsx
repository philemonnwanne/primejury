import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CaseTimeline } from "@/components/cases/CaseTimeline"
import { Eye, PencilLine } from "lucide-react"
import { CaseOverviewTab } from "./tabs/CaseOverviewTab"
import { DocumentsTab } from "./tabs/DocumentsTab"
import { BillingTab } from "./tabs/BillingTab"
import { useToast } from "@/hooks/use-toast"

interface LawyerCaseDetailsProps {
  caseId: string
}

export function LawyerCaseDetails({ caseId }: LawyerCaseDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    })
    setIsEditing(false)
  }

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
    }
  }

  const mockBillingData = {
    billingType: "hourly",
    rate: "250",
    schedule: "monthly",
    totalPaid: 5000,
    pendingAmount: 2500,
    nextPaymentDate: "2024-04-15",
    paymentMethod: {
      type: "credit_card",
      last4: "4242"
    },
    paymentHistory: [
      {
        date: "2024-03-01",
        amount: 2500,
        status: "paid"
      },
      {
        date: "2024-02-01",
        amount: 2500,
        status: "paid"
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
          className="h-10 w-10"
        >
          {isEditing ? (
            <Eye className="h-4 w-4" />
          ) : (
            <PencilLine className="h-4 w-4" />
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
          <CaseOverviewTab 
            isEditing={isEditing} 
            caseData={mockCaseData} 
            onSave={handleSave} 
          />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="billing">
          <BillingTab 
            isEditing={isEditing} 
            initialData={mockBillingData}
            onSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="timeline">
          <CaseTimeline 
            events={mockTimelineEvents}
            onUpdateEvent={isEditing ? (updatedEvent, index) => {
              // Handle timeline event update
              toast({
                title: "Timeline Updated",
                description: "The timeline event has been updated successfully.",
              })
            } : undefined}
            onAddEvent={isEditing ? (newEvent) => {
              // Handle new timeline event
              toast({
                title: "Event Added",
                description: "A new timeline event has been added.",
              })
            } : undefined}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}