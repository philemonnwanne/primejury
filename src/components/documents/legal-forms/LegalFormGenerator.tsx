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
import { LegalDocument } from "../legal-documents/LegalDocument"
import { formTypes } from "./FormTypes"
import { generateLegalContent } from "@/utils/documentGeneration"

// Mock cases data - in a real app, this would come from an API
const mockCases = [
  {
    id: "1",
    title: "Smith vs. Johnson",
    type: "Civil Law",
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

export function LegalFormGenerator() {
  const [selectedCase, setSelectedCase] = useState("")
  const [formType, setFormType] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [editedContent, setEditedContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const selectedCaseData = mockCases.find(c => c.id === selectedCase)
  const selectedFormType = formTypes.find(d => d.value === formType)

  const generateForm = async () => {
    if (!selectedCase || !formType) {
      toast({
        title: "Missing Information",
        description: "Please select both a case and form type",
        variant: "destructive",
      })
      return
    }

    if (!selectedCaseData || !selectedFormType) return

    setIsGenerating(true)
    try {
      let content = selectedFormType.template
      
      if (description) {
        const generatedContent = await generateLegalContent(
          description,
          selectedFormType.label,
          {
            state: selectedCaseData.court.state,
            county: selectedCaseData.court.county,
          }
        )
        content = content.replace("{content}", generatedContent)
      }
      
      content = content.replace(/{state}/g, selectedCaseData.court.state)
      content = content.replace(/{county}/g, selectedCaseData.court.county)
      content = content.replace(/{caseNumber}/g, selectedCase)
      content = content.replace(/{date}/g, new Date().toLocaleDateString())

      setGeneratedContent(content)
      setEditedContent(content)
      setIsEditing(true)
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate form content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Legal Form Generator</CardTitle>
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
              <Label htmlFor="form-type">Form Type</Label>
              <Select value={formType} onValueChange={setFormType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select form type" />
                </SelectTrigger>
                <SelectContent>
                  {formTypes
                    .filter(type => type.category === selectedCaseData?.type)
                    .map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {selectedFormType && (
                <p className="text-sm text-muted-foreground">
                  {selectedFormType.description}
                </p>
              )}
            </div>
          )}

          {selectedCase && formType && (
            <div className="space-y-2">
              <Label htmlFor="description">Form Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you want the form to contain..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {!isEditing ? (
            <div className="flex justify-end">
              <Button 
                onClick={generateForm}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Form"}
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="content">Edit Form Content</Label>
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
                      type={formType}
                      caseNumber={selectedCase}
                      content={editedContent}
                      court={selectedCaseData?.court}
                    />
                  }
                  fileName={`${formType}-${selectedCase}.pdf`}
                >
                  {({ loading }) => (
                    <Button disabled={loading}>
                      {loading ? "Preparing..." : "Download Form"}
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
