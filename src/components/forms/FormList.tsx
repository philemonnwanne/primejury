import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormEditor } from "./FormEditor"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface FormField {
  id: string
  label: string
  type: "text" | "date" | "select" | "checkbox"
  value: string
  options?: string[]
  required?: boolean
}

interface Form {
  id: string
  title: string
  description: string
  category: string
  language: string
  fields: FormField[]
}

interface FormListProps {
  forms: Form[]
  searchTerm: string
  selectedCategory: string
  selectedLanguage: string
  userProfile?: { [key: string]: string }
}

export function FormList({
  forms,
  searchTerm,
  selectedCategory,
  selectedLanguage,
  userProfile,
}: FormListProps) {
  const [selectedForm, setSelectedForm] = useState<Form | null>(null)
  const { toast } = useToast()

  const filteredForms = forms.filter((form) => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || form.category === selectedCategory
    const matchesLanguage = selectedLanguage === "all" || form.language === selectedLanguage
    return matchesSearch && matchesCategory && matchesLanguage
  })

  const handleSave = async (formData: { [key: string]: string }) => {
    try {
      // In a real app, this would save to a backend
      toast({
        title: "Form Saved",
        description: "Your form has been saved successfully",
      })
      setSelectedForm(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form",
        variant: "destructive",
      })
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleEFile = async () => {
    try {
      // In a real app, this would submit to e-filing system
      toast({
        title: "Form Submitted",
        description: "Your form has been submitted for e-filing",
      })
      setSelectedForm(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to e-file form",
        variant: "destructive",
      })
    }
  }

  return (
    <>
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
                <Button onClick={() => setSelectedForm(form)}>
                  Fill Out Form
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedForm} onOpenChange={() => setSelectedForm(null)}>
        <DialogContent className="max-w-4xl">
          {selectedForm && (
            <FormEditor
              formId={selectedForm.id}
              title={selectedForm.title}
              fields={selectedForm.fields}
              onSave={handleSave}
              onPrint={handlePrint}
              onEFile={handleEFile}
              prefilledData={userProfile}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
