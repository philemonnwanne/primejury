import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RelatedForm {
  id: string
  title: string
  category: string
}

interface RelatedFormsProps {
  forms: RelatedForm[]
  formDescriptions: Record<string, string>
}

export function RelatedForms({ forms, formDescriptions }: RelatedFormsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Forms</CardTitle>
        <CardDescription>Forms and templates for your case</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {forms.map((form) => (
          <div
            key={form.id}
            className="flex flex-col space-y-2 rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{form.title}</p>
                <p className="text-sm text-muted-foreground">{form.category}</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {formDescriptions[form.title as keyof typeof formDescriptions]}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}