import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const mockPendingForms = [
  {
    id: "1",
    title: "Affidavit of Support",
    caseTitle: "Immigration Case #1234",
    dueDate: "2024-03-15",
    status: "pending",
  },
  {
    id: "2",
    title: "Character Reference Letter",
    caseTitle: "Criminal Defense - John Doe",
    dueDate: "2024-03-20",
    status: "pending",
  },
]

export function PendingFormsSection() {
  const { toast } = useToast()

  const handleUpload = (formId: string) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf,.doc,.docx"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        toast({
          title: "Form Uploaded",
          description: `${file.name} has been uploaded successfully.`,
        })
      }
    }
    input.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Pending Forms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockPendingForms.map((form) => (
          <div
            key={form.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-1">
              <p className="font-medium">{form.title}</p>
              <p className="text-sm text-muted-foreground">
                Case: {form.caseTitle}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Due: {new Date(form.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpload(form.id)}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}