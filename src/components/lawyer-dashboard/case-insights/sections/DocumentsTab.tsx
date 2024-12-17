import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentUpload } from "@/components/documents/DocumentUpload"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function DocumentsTab() {
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

  return (
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
  )
}