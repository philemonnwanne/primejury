import { Card, CardContent } from "@/components/ui/card"
import { DocumentLibrary } from "@/components/documents/DocumentLibrary"
import { DocumentUpload } from "@/components/documents/DocumentUpload"
import { DocumentRequest } from "@/components/documents/DocumentRequest"
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

interface DocumentsTabProps {
  isEditing: boolean
  caseId?: string
}

export function DocumentsTab({ isEditing, caseId }: DocumentsTabProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  // Mock cases data - in a real app, this would come from a context or prop
  const mockCases = [
    { id: "1", title: "Smith vs. Johnson" },
    { id: "2", title: "Tech Corp Merger" },
  ]

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex justify-end">
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
                  Upload and categorize documents for your case
                </SheetDescription>
              </SheetHeader>
              <DocumentUpload 
                onSuccess={() => setIsUploadOpen(false)}
                prefilledCaseId={caseId}
              />
            </SheetContent>
          </Sheet>
        </div>

        <DocumentLibrary type="case" />
        
        {isEditing && (
          <DocumentRequest 
            prefilledCaseId={caseId} 
            cases={mockCases}
          />
        )}
      </CardContent>
    </Card>
  )
}