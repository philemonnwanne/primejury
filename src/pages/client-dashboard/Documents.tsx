import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Folder } from "lucide-react"

const suggestedDocuments = [
  {
    title: "Property Deed",
    description: "Required for your active property case",
    priority: "High",
  },
  {
    title: "Insurance Policy",
    description: "Needed for claim verification",
    priority: "Medium",
  },
]

const caseFolders = [
  {
    name: "Property Dispute",
    documentCount: 5,
  },
  {
    name: "Contract Review",
    documentCount: 3,
  },
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
                <Button variant="link" className="mt-2">
                  browse to upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedDocuments.map((doc) => (
                <div
                  key={doc.title}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{doc.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                  </div>
                  <Button variant="outline">Upload</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Case Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseFolders.map((folder) => (
                <div
                  key={folder.name}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Folder className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{folder.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {folder.documentCount} documents
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost">View</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientDashboardLayout>
  )
}