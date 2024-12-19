import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { FileUp } from "lucide-react"

interface DocumentRequestProps {
  prefilledCaseId?: string
  cases: Array<{ id: string; title: string }>
}

export function DocumentRequest({ prefilledCaseId, cases }: DocumentRequestProps) {
  const [selectedCase, setSelectedCase] = useState(prefilledCaseId || "")
  const [documentType, setDocumentType] = useState("")
  const [details, setDetails] = useState("")
  const { toast } = useToast()

  const handleRequest = () => {
    if (!selectedCase || !documentType || !details) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Mock request functionality
    toast({
      title: "Document Requested",
      description: "The client has been notified of your request",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="fixed bottom-6 right-6">
          <FileUp className="mr-2 h-4 w-4" />
          Request Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Document from Client</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!prefilledCaseId && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Case</label>
              <Select value={selectedCase} onValueChange={setSelectedCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a case" />
                </SelectTrigger>
                <SelectContent>
                  {cases.map((case_) => (
                    <SelectItem key={case_.id} value={case_.id}>
                      {case_.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Type</label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal">Legal Document</SelectItem>
                <SelectItem value="identification">Identification</SelectItem>
                <SelectItem value="financial">Financial Document</SelectItem>
                <SelectItem value="evidence">Evidence</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Details</label>
            <Input
              placeholder="Describe the required document..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleRequest}>
            Send Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}