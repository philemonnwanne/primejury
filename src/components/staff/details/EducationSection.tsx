import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import { StaffMember } from "../mock-data"

interface EducationSectionProps {
  staffMember: StaffMember
  isEditing: boolean
  onEducationChange: (education: StaffMember['education']) => void
}

export function EducationSection({ staffMember, isEditing, onEducationChange }: EducationSectionProps) {
  const handleAddEducation = () => {
    const newEducation = [...(staffMember.education || []), {
      degree: "",
      institution: "",
      year: new Date().getFullYear()
    }]
    onEducationChange(newEducation)
  }

  const handleRemoveEducation = (index: number) => {
    const newEducation = staffMember.education?.filter((_, i) => i !== index)
    onEducationChange(newEducation)
  }

  const handleEducationChange = (index: number, field: string, value: string | number) => {
    const newEducation = staffMember.education?.map((edu, i) => {
      if (i === index) {
        return { ...edu, [field]: value }
      }
      return edu
    })
    onEducationChange(newEducation)
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Education</h3>
          <Button type="button" size="sm" onClick={handleAddEducation}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
        <div className="space-y-4">
          {staffMember.education?.map((edu, index) => (
            <div key={index} className="relative p-4 border rounded-lg">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={() => handleRemoveEducation(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-4">
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input
                    type="number"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, "year", parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Education</h3>
      <div className="space-y-2">
        {staffMember.education?.map((edu, index) => (
          <div key={index} className="p-3 bg-muted rounded-lg">
            <p className="font-medium">{edu.degree}</p>
            <p className="text-sm text-muted-foreground">
              {edu.institution}, {edu.year}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}