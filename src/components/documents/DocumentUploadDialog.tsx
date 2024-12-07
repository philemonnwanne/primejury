import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileUp, Laptop, Cloud } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface DocumentUploadDialogProps {
  cases: Array<{ id: string; title: string }>
}

export function DocumentUploadDialog({ cases }: DocumentUploadDialogProps) {
  const [selectedCase, setSelectedCase] = useState("")
  const { toast } = useToast()

  const handleUpload = (source: string) => {
    if (!selectedCase) {
      toast({
        title: "Please select a case",
        description: "You must select a case before uploading documents",
        variant: "destructive",
      })
      return
    }

    // Mock upload functionality
    toast({
      title: "Upload started",
      description: `Uploading from ${source} to case ${selectedCase}`,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="mt-2">
          browse to upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2"
              onClick={() => handleUpload("computer")}
            >
              <Laptop className="h-8 w-8" />
              <span>Computer</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2"
              onClick={() => handleUpload("cloud")}
            >
              <Cloud className="h-8 w-8" />
              <span>Cloud Storage</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}