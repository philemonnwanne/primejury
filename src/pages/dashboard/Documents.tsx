import { DashboardLayout } from "@/layouts/DashboardLayout"
import { DocumentLibrary } from "@/components/documents/DocumentLibrary"
import { DocumentUpload } from "@/components/documents/DocumentUpload"
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

export default function Documents() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
            <p className="text-sm text-muted-foreground">
              Manage and organize your case-related documents
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
                  Upload and tag your documents for easy organization
                </SheetDescription>
              </SheetHeader>
              <DocumentUpload onSuccess={() => setIsUploadOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
        <DocumentLibrary />
      </div>
    </DashboardLayout>
  )
}