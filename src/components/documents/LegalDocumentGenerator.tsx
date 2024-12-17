import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { LegalDocument } from "./legal-documents/LegalDocument"
import { documentTypes } from "./legal-documents/documentTypes"

// Mock cases data - in a real app, this would come from an API
const mockCases = [
  {
    id: "1",
    title: "Smith vs. Johnson",
    type: "Civil Litigation",
    court: {
      name: "Sacramento County Superior Court",
      state: "California",
      county: "Sacramento",
      address: "720 9th Street, Sacramento, CA 95814"
    }
  },
  {
    id: "2",
    title: "State vs. Thompson",
    type: "Criminal Law",
    court: {
      name: "Los Angeles County Superior Court",
      state: "California",
      county: "Los Angeles",
      address: "111 N Hill St, Los Angeles, CA 90012"
    }
  }
]

export function LegalDocumentGenerator() {
  const [selectedCase, setSelectedCase] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [editedContent, setEditedContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const selectedCaseData = mockCases.find(c => c.id === selectedCase)
  const selectedDocType = documentTypes.find(d => d.value === documentType)

  const generateDocument = () => {
    if (!selectedCase || !documentType) {
      toast({
        title: "Missing Information",
        description: "Please select both a case and document type",
        variant: "destructive",
      })
      return
    }

    if (!selectedCaseData || !selectedDocType) return

    let content = selectedDocType.template
    content = content.replace("{state}", selectedCaseData.court.state)
    content = content.replace("{county}", selectedCaseData.court.county)
    content = content.replace("{caseNumber}", selectedCase)
    content = content.replace("{date}", new Date().toLocaleDateString())

    setGeneratedContent(content)
    setEditedContent(content)
    setIsEditing(true)
  }

  const handleDownload = () => {
    toast({
      title: "Document Generated",
      description: "Your legal document has been generated successfully",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Legal Document Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="case">Select Case</Label>
            <Select value={selectedCase} onValueChange={setSelectedCase}>
              <SelectTrigger>
                <SelectValue placeholder="Select a case" />
              </SelectTrigger>
              <SelectContent>
                {mockCases.map((case_) => (
                  <SelectItem key={case_.id} value={case_.id}>
                    {case_.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCase && (
            <div className="space-y-2">
              <Label htmlFor="document-type">Document Type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes
                    .filter(type => type.category === selectedCaseData?.type)
                    .map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {selectedDocType && (
                <p className="text-sm text-muted-foreground">
                  {selectedDocType.description}
                </p>
              )}
            </div>
          )}

          {!isEditing ? (
            <div className="flex justify-end">
              <Button onClick={generateDocument}>Generate Document</Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="content">Edit Document Content</Label>
                <Textarea
                  id="content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={15}
                  className="font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                  setEditedContent(generatedContent)
                }}>
                  Reset to Original
                </Button>
                <PDFDownloadLink
                  document={
                    <LegalDocument
                      type={documentType}
                      caseNumber={selectedCase}
                      content={editedContent}
                      court={selectedCaseData?.court}
                    />
                  }
                  fileName={`${documentType}-${selectedCase}.pdf`}
                >
                  {({ loading }) => (
                    <Button disabled={loading} onClick={handleDownload}>
                      {loading ? "Preparing..." : "Download Document"}
                    </Button>
                  )}
                </PDFDownloadLink>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}