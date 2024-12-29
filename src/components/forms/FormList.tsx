import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Form {
  id: string
  title: string
  description: string
  category: string
  language: string
}

interface FormListProps {
  forms: Form[]
  searchTerm: string
  selectedCategory: string
  selectedLanguage: string
}

export function FormList({ forms, searchTerm, selectedCategory, selectedLanguage }: FormListProps) {
  const filteredForms = forms.filter((form) => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || form.category === selectedCategory
    const matchesLanguage = selectedLanguage === "all" || form.language === selectedLanguage
    return matchesSearch && matchesCategory && matchesLanguage
  })

  return (
    <div className="space-y-4">
      {filteredForms.map((form) => (
        <Card key={form.id}>
          <CardHeader>
            <CardTitle className="text-xl">{form.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{form.description}</p>
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <span className="text-sm text-muted-foreground">
                  {form.category}
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {form.language}
                </span>
              </div>
              <Button>Fill Out Form</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}