import { AlertTriangle, Clock, Upload, Trash2, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

interface PendingDocument {
  id: string
  title: string
  caseTitle: string
  dueDate: string
  status: "urgent" | "upcoming" | "overdue"
  uploaded?: boolean
  fileName?: string
}

const initialMockPendingDocuments: PendingDocument[] = [
  {
    id: "1",
    title: "Signed Settlement Agreement",
    caseTitle: "Smith vs. Johnson",
    dueDate: "2024-03-25",
    status: "urgent"
  },
  {
    id: "2",
    title: "Property Deed Documentation",
    caseTitle: "Estate Planning - Brown",
    dueDate: "2024-04-01",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Insurance Policy Documents",
    caseTitle: "Personal Injury Case",
    dueDate: "2024-03-15",
    status: "overdue"
  }
]

export function PendingDocuments() {
  const { toast } = useToast()
  const [pendingDocuments, setPendingDocuments] = useState<PendingDocument[]>(initialMockPendingDocuments)

  const getStatusColor = (status: PendingDocument["status"]) => {
    switch (status) {
      case "urgent":
        return "text-yellow-600 bg-yellow-50"
      case "overdue":
        return "text-red-600 bg-red-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleUpload = (doc: PendingDocument) => {
    const input = window.document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // Remove document from pending list
        setPendingDocuments(docs => docs.filter(d => d.id !== doc.id))
        
        // Show success message
        toast({
          title: "Document Uploaded",
          description: `${file.name} has been uploaded to ${doc.caseTitle}`,
        })

        // Mock adding to case folder (in a real app, this would interact with your backend)
        toast({
          title: "Document Added to Case",
          description: `${file.name} has been added to ${doc.caseTitle} folder`,
        })
      }
    }
    input.click()
  }

  const handleDelete = (doc: PendingDocument) => {
    setPendingDocuments(docs =>
      docs.map(d =>
        d.id === doc.id
          ? { ...d, uploaded: false, fileName: undefined }
          : d
      )
    )
    toast({
      title: "Document Deleted",
      description: `Document has been removed from ${doc.title}`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          Pending Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingDocuments.map((doc) => {
          const daysRemaining = getDaysRemaining(doc.dueDate)
          return (
            <div
              key={doc.id}
              className={cn(
                "flex items-center justify-between rounded-lg p-4",
                getStatusColor(doc.status)
              )}
            >
              <div className="space-y-1">
                <p className="font-medium">{doc.title}</p>
                <p className="text-sm text-muted-foreground">
                  Case: {doc.caseTitle}
                </p>
                {doc.uploaded && (
                  <p className="text-sm text-green-600">
                    Uploaded: {doc.fileName}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {daysRemaining < 0
                      ? `${Math.abs(daysRemaining)} days overdue`
                      : daysRemaining === 0
                      ? "Due today"
                      : `${daysRemaining} days remaining`}
                  </span>
                </div>
                <div className="flex gap-2">
                  {doc.uploaded ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(doc)}
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpload(doc)}
                        className="gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Replace
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpload(doc)}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}