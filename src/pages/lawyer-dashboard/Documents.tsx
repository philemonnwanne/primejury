import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentLibrary } from "@/components/documents/DocumentLibrary"
import { DocumentUpload } from "@/components/documents/DocumentUpload"
import { LegalDocumentGenerator } from "@/components/documents/LegalDocumentGenerator"
import { LegalFormGenerator } from "@/components/documents/legal-forms/LegalFormGenerator"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function LawyerDocuments() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Document Center</h1>
            <p className="text-muted-foreground">
              Manage case documents, generate legal documents and forms
            </p>
          </div>
          <Sheet open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Upload Document</SheetTitle>
                <SheetDescription>
                  Upload and categorize documents for your cases
                </SheetDescription>
              </SheetHeader>
              <DocumentUpload onSuccess={() => setIsUploadOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <Tabs defaultValue="case-documents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="case-documents">Case Documents</TabsTrigger>
            <TabsTrigger value="document-generator">Document Generator</TabsTrigger>
            <TabsTrigger value="form-generator">Form Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="case-documents">
            <DocumentLibrary />
          </TabsContent>

          <TabsContent value="document-generator">
            <LegalDocumentGenerator />
          </TabsContent>

          <TabsContent value="form-generator">
            <LegalFormGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </LawyerDashboardLayout>
  )
}