import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Folder } from "lucide-react"
import { PendingDocuments } from "@/components/documents/PendingDocuments"
import { DocumentUploadDialog } from "@/components/documents/DocumentUploadDialog"

const mockCases = [
  {
    id: "1",
    title: "Smith vs. Johnson",
    documentCount: 5,
  },
  {
    id: "2",
    title: "Estate Planning - Brown",
    documentCount: 3,
  },
  {
    id: "3",
    title: "Personal Injury Case",
    documentCount: 2,
  }
]

export default function ClientDocuments() {
  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Center</h1>
          <p className="text-muted-foreground">
            Manage and organize your case-related documents
          </p>
        </div>

        <PendingDocuments />

        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Drag and drop your files here, or
                </p>
                <DocumentUploadDialog cases={mockCases} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case Folders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCases.map((case_) => (
              <div
                key={case_.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Folder className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{case_.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {case_.documentCount} documents
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => window.open(`/case/${case_.id}/documents`, '_blank')}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ClientDashboardLayout>
  )
}