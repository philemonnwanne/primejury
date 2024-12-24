import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Check, Plus, X } from "lucide-react"
import { StaffMember } from "../mock-data"

interface EducationSectionProps {
  staffMember: StaffMember
  onUpdate: (education: Array<{ degree: string; institution: string; year: number }>) => void
}

export function EducationSection({ staffMember, onUpdate }: EducationSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [education, setEducation] = useState(staffMember.education || [])

  const handleAdd = () => {
    setEducation([...education, { degree: "", institution: "", year: new Date().getFullYear() }])
  }

  const handleRemove = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const handleUpdate = (index: number, field: string, value: string | number) => {
    setEducation(education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    ))
  }

  const handleSave = () => {
    onUpdate(education)
    setIsEditing(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Education</h3>
        <div className="flex gap-2">
          {isEditing && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleAdd}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {education.map((edu, index) => (
          <div key={index} className="relative p-3 bg-muted rounded-lg">
            {isEditing && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background shadow-sm hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={edu.degree}
                  onChange={(e) => handleUpdate(index, "degree", e.target.value)}
                  placeholder="Degree"
                />
                <Input
                  value={edu.institution}
                  onChange={(e) => handleUpdate(index, "institution", e.target.value)}
                  placeholder="Institution"
                />
                <Input
                  type="number"
                  value={edu.year}
                  onChange={(e) => handleUpdate(index, "year", parseInt(e.target.value))}
                  placeholder="Year"
                />
              </div>
            ) : (
              <>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {edu.institution}, {edu.year}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}