import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { SignaturePad } from "./SignaturePad"

interface FormField {
  id: string
  label: string
  type: "text" | "date" | "select" | "checkbox"
  value: string
  options?: string[]
  required?: boolean
}

interface FormEditorProps {
  formId: string
  title: string
  fields: FormField[]
  onSave: (formData: { [key: string]: string }) => void
  onPrint: () => void
  onEFile: () => void
  prefilledData?: { [key: string]: string }
}

export function FormEditor({
  formId,
  title,
  fields,
  onSave,
  onPrint,
  onEFile,
  prefilledData,
}: FormEditorProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    prefilledData || {}
  )
  const [signature, setSignature] = useState<string>("")
  const { toast } = useToast()

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const handleSave = () => {
    if (!signature) {
      toast({
        title: "Signature Required",
        description: "Please sign the form before saving",
        variant: "destructive",
      })
      return
    }
    onSave({ ...formData, signature })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            {field.type === "select" ? (
              <select
                id={field.id}
                value={formData[field.id] || ""}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className="w-full border rounded-md p-2"
                required={field.required}
              >
                <option value="">Select...</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={field.id}
                type={field.type}
                value={formData[field.id] || ""}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                required={field.required}
              />
            )}
          </div>
        ))}
        
        <div className="space-y-2">
          <Label>Signature</Label>
          <SignaturePad onChange={setSignature} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onPrint}>
          Print
        </Button>
        <Button variant="outline" onClick={handleSave}>
          Save Draft
        </Button>
        <Button onClick={onEFile}>E-File</Button>
      </CardFooter>
    </Card>
  )
}