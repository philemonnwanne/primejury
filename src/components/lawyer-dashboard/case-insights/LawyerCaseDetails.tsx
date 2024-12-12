import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CaseTimeline } from "@/components/cases/CaseTimeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DocumentUpload } from "@/components/documents/DocumentUpload"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { FileText, DollarSign, Calendar, Send } from "lucide-react"

interface LawyerCaseDetailsProps {
  caseId: string
}

export function LawyerCaseDetails({ caseId }: LawyerCaseDetailsProps) {
  const [documentRequest, setDocumentRequest] = useState("")
  const { toast } = useToast()

  const handleDocumentRequest = () => {
    if (!documentRequest.trim()) {
      toast({
        title: "Error",
        description: "Please enter a document request description",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Document Request Sent",
      description: "The client has been notified of your request",
    })
    setDocumentRequest("")
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

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Case Title</label>
                  <Input defaultValue="Smith vs. Johnson" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Case Type</label>
                  <Select defaultValue="civil">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="civil">Civil Litigation</SelectItem>
                      <SelectItem value="criminal">Criminal Defense</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select defaultValue="high">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Case Description</label>
                <Textarea className="min-h-[100px]" defaultValue="Contract dispute regarding construction project delays" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Upload New Document</h3>
                <DocumentUpload onSuccess={() => {
                  toast({
                    title: "Document Uploaded",
                    description: "The document has been successfully uploaded",
                  })
                }} />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Request Document from Client</h3>
                <div className="flex gap-4">
                  <Input
                    placeholder="Describe the document needed..."
                    value={documentRequest}
                    onChange={(e) => setDocumentRequest(e.target.value)}
                  />
                  <Button onClick={handleDocumentRequest}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Billing Type</label>
                  <Select defaultValue="hourly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly Rate</SelectItem>
                      <SelectItem value="flat">Flat Fee</SelectItem>
                      <SelectItem value="contingency">Contingency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rate/Amount</label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Schedule</label>
                <Select defaultValue="monthly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="milestone">Milestone-based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Update Billing</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <CaseTimeline events={mockTimelineEvents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}