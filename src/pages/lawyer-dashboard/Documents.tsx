import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentLibrary } from "@/components/documents/DocumentLibrary"
import { DocumentUpload } from "@/components/documents/DocumentUpload"
import { LegalFormDirectory } from "@/components/documents/LegalFormDirectory"
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
              Manage case documents, legal forms, and client communications
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
            <TabsTrigger value="legal-forms">Legal Forms</TabsTrigger>
            <TabsTrigger value="client-documents">Client Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="case-documents">
            <DocumentLibrary />
          </TabsContent>

          <TabsContent value="legal-forms">
            <LegalFormDirectory />
          </TabsContent>

          <TabsContent value="client-documents">
            <DocumentLibrary type="client" />
          </TabsContent>
        </Tabs>
      </div>
    </LawyerDashboardLayout>
  )
}