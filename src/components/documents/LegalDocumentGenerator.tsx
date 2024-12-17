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

const documentTypes = [
  {
    value: "complaint",
    label: "Civil Complaint",
    jurisdiction: "California Superior Court",
  },
  {
    value: "motion",
    label: "Motion for Summary Judgment",
    jurisdiction: "California Superior Court",
  },
  {
    value: "petition",
    label: "Petition for Dissolution",
    jurisdiction: "California Family Court",
  },
]

export function LegalDocumentGenerator() {
  const [documentType, setDocumentType] = useState("")
  const [caseNumber, setCaseNumber] = useState("")
  const [partyName, setPartyName] = useState("")
  const [content, setContent] = useState("")
  const { toast } = useToast()

  const handleGenerate = () => {
    if (!documentType || !caseNumber || !partyName || !content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Document Generated",
      description: "Your legal document has been generated successfully",
    })
  }

  const selectedDocument = documentTypes.find(doc => doc.value === documentType)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Legal Document Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="document-type">Document Type</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDocument && (
              <p className="text-sm text-muted-foreground">
                Jurisdiction: {selectedDocument.jurisdiction}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="case-number">Case Number</Label>
            <Input
              id="case-number"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              placeholder="Enter case number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="party-name">Party Name</Label>
            <Input
              id="party-name"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              placeholder="Enter party name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Document Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter document content"
              rows={6}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => {
              setCaseNumber("")
              setPartyName("")
              setContent("")
              setDocumentType("")
            }}>
              Reset
            </Button>
            {documentType && caseNumber && partyName && content ? (
              <PDFDownloadLink
                document={
                  <LegalDocument
                    type={documentType}
                    caseNumber={caseNumber}
                    partyName={partyName}
                    content={content}
                  />
                }
                fileName={`${documentType}-${caseNumber}.pdf`}
              >
                {({ loading }) => (
                  <Button disabled={loading}>
                    {loading ? "Generating..." : "Download Document"}
                  </Button>
                )}
              </PDFDownloadLink>
            ) : (
              <Button onClick={handleGenerate}>Generate Document</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}