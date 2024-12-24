import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StaffMember } from "../mock-data"
import { Pencil, Check } from "lucide-react"

interface DemographicsSectionProps {
  staffMember: StaffMember
  onUpdate: (field: string, value: string) => void
}

export function DemographicsSection({ staffMember, onUpdate }: DemographicsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({
    name: staffMember.name,
    email: staffMember.email,
    phone: staffMember.phone,
  })

  const handleSave = () => {
    Object.entries(editValues).forEach(([field, value]) => {
      onUpdate(field, value)
    })
    setIsEditing(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Demographics</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Full Name</p>
          {isEditing ? (
            <Input
              value={editValues.name}
              onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1"
            />
          ) : (
            <p className="font-medium">{staffMember.name}</p>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Role</p>
          <Badge>{staffMember.role}</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          {isEditing ? (
            <Input
              value={editValues.email}
              onChange={(e) => setEditValues(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1"
            />
          ) : (
            <p className="font-medium">{staffMember.email}</p>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          {isEditing ? (
            <Input
              value={editValues.phone}
              onChange={(e) => setEditValues(prev => ({ ...prev, phone: e.target.value }))}
              className="mt-1"
            />
          ) : (
            <p className="font-medium">{staffMember.phone}</p>
          )}
        </div>
      </div>
    </div>
  )
}