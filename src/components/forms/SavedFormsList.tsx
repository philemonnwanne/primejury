import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Clock } from "lucide-react"

interface SavedForm {
  id: string
  title: string
  lastModified: string
  status: "draft" | "submitted"
}

interface SavedFormsListProps {
  forms: SavedForm[]
  onFormSelect: (formId: string) => void
}

export function SavedFormsList({ forms, onFormSelect }: SavedFormsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Saved Forms
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {forms.map((form) => (
          <div
            key={form.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-1">
              <p className="font-medium">{form.title}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last modified: {form.lastModified}</span>
                <span>•</span>
                <span className="capitalize">{form.status}</span>
              </div>
            </div>
            <Button variant="outline" onClick={() => onFormSelect(form.id)}>
              Continue Editing
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}