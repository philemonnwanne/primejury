import { useState } from "react"
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

interface DocumentUploadProps {
  onSuccess: () => void
}

export function DocumentUpload({ onSuccess }: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [selectedCase, setSelectedCase] = useState("")
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedCase) {
      toast({
        title: "Error",
        description: "Please select a file and assign it to a case",
        variant: "destructive",
      })
      return
    }

    // Mock upload success
    toast({
      title: "Success",
      description: "Document uploaded successfully",
    })
    onSuccess()
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Assign to Case</label>
        <Select value={selectedCase} onValueChange={setSelectedCase}>
          <SelectTrigger>
            <SelectValue placeholder="Select a case" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="case1">Smith vs. Johnson</SelectItem>
            <SelectItem value="case2">Tech Corp Merger</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <Select
          value={tags[0]}
          onValueChange={(value) => setTags([...tags, value])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Add tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="evidence">Evidence</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="filing">Filing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleUpload} className="w-full">
        Upload Document
      </Button>
    </div>
  )
}