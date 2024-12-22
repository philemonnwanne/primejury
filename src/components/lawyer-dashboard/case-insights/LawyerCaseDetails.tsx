import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CaseTimeline } from "@/components/cases/CaseTimeline"
import { Eye, PencilLine } from "lucide-react"
import { CaseOverviewTab } from "./tabs/CaseOverviewTab"
import { DocumentsTab } from "./tabs/DocumentsTab"
import { BillingTab } from "./tabs/BillingTab"
import { useToast } from "@/hooks/use-toast"
import { mockCases } from "@/components/cases/mock-data/cases"
import { FloatingTimer } from "../timer/FloatingTimer"

interface LawyerCaseDetailsProps {
  caseId: string
}

export function LawyerCaseDetails({ caseId }: LawyerCaseDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()
  
  // Find the specific case data based on the caseId
  const selectedCase = mockCases.find(c => c.id === caseId)

  // Mock data specific to the selected case
  const caseSpecificData = selectedCase ? {
    title: selectedCase.title,
    type: selectedCase.type,
    status: selectedCase.status,
    priority: selectedCase.priority,
    description: `Case details for ${selectedCase.title}`,
    estimatedDuration: "6-8 months",
    subject: `${selectedCase.type} case involving ${selectedCase.client}`,
    lawyer: {
      name: selectedCase.lawyer,
      email: `${selectedCase.lawyer.toLowerCase().replace(' ', '.')}@lawfirm.com`,
      phone: "(555) 123-4567",
      id: `lawyer_id_${selectedCase.id}`
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
  } : null

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    })
    setIsEditing(false)
  }

  if (!caseSpecificData) {
    return <div>Case not found</div>
  }

  return (
    <div className="space-y-6">
      <FloatingTimer />
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
            caseData={caseSpecificData} 
            onSave={handleSave} 
          />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="billing">
          <BillingTab 
            isEditing={isEditing} 
            initialData={{
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
            }}
            onSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="timeline">
          <CaseTimeline 
            events={[
              {
                date: `${selectedCase.createdAt}`,
                title: "Case Created",
                description: `Initial filing for ${selectedCase.title}`,
                status: "completed" as const,
                details: {
                  lawyerNotes: `Case opened by ${selectedCase.lawyer}`,
                }
              },
              {
                date: new Date(new Date(selectedCase.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                title: "Initial Review",
                description: "Case documentation review",
                status: "completed" as const,
                details: {
                  lawyerNotes: "Initial documentation reviewed",
                }
              }
            ]}
            onUpdateEvent={isEditing ? (updatedEvent, index) => {
              toast({
                title: "Timeline Updated",
                description: "The timeline event has been updated successfully.",
              })
            } : undefined}
            onAddEvent={isEditing ? (newEvent) => {
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
