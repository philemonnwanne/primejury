import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentLibrary } from "@/components/documents/DocumentLibrary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Folder } from "lucide-react"
import { PendingDocuments } from "@/components/documents/PendingDocuments"
import { DocumentUploadDialog } from "@/components/documents/DocumentUploadDialog"
import { FormFilters } from "@/components/forms/FormFilters"
import { SuggestedForms } from "@/components/forms/SuggestedForms"
import { FormList } from "@/components/forms/FormList"
import { useState } from "react"

// Mock data for current case and forms
const currentCase = {
  type: "Civil Litigation",
  title: "Smith vs. Johnson"
}

const suggestedForms = [
  {
    id: "1",
    title: "Civil Complaint Form",
    description: "Standard form for filing civil complaints",
    category: "civil",
    usage: "Use this form to initiate a civil lawsuit"
  },
  {
    id: "2",
    title: "Motion for Summary Judgment",
    description: "Request for judgment without full trial",
    category: "civil",
    usage: "Use when seeking judgment based on undisputed facts"
  }
]

const allForms = [
  {
    id: "1",
    title: "Civil Complaint Form",
    description: "Standard form for filing civil complaints",
    category: "civil",
    language: "english"
  },
  {
    id: "2",
    title: "Criminal Defense Questionnaire",
    description: "Initial case assessment form",
    category: "criminal",
    language: "english"
  },
  {
    id: "3",
    title: "Formulario de Divorcio",
    description: "Divorce petition form in Spanish",
    category: "family",
    language: "spanish"
  }
]

export default function FormsAndDocuments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forms & Documents</h1>
          <p className="text-muted-foreground">
            Access legal forms and manage case-related documents
          </p>
        </div>

        <Tabs defaultValue="forms" className="space-y-4">
          <TabsList>
            <TabsTrigger value="forms">Legal Forms</TabsTrigger>
            <TabsTrigger value="documents">Document Center</TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-6">
            <FormFilters
              onSearch={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onLanguageChange={setSelectedLanguage}
            />
            
            <SuggestedForms
              caseType={currentCase.title}
              forms={suggestedForms}
            />

            <FormList
              forms={allForms}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              selectedLanguage={selectedLanguage}
            />
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
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
                    <DocumentUploadDialog cases={[]} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <DocumentLibrary />
          </TabsContent>
        </Tabs>
      </div>
    </ClientDashboardLayout>
  )
}