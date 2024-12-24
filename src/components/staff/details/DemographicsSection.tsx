import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StaffMember } from "../mock-data"

interface DemographicsSectionProps {
  staffMember: StaffMember
  isEditing: boolean
  onFieldChange: (field: string, value: string) => void
}

export function DemographicsSection({ staffMember, isEditing, onFieldChange }: DemographicsSectionProps) {
  if (isEditing) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Demographics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={staffMember.name}
              onChange={(e) => onFieldChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={staffMember.role}
              onChange={(e) => onFieldChange("role", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={staffMember.email}
              onChange={(e) => onFieldChange("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={staffMember.phone}
              onChange={(e) => onFieldChange("phone", e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Demographics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Full Name</p>
          <p className="font-medium">{staffMember.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Role</p>
          <Badge>{staffMember.role}</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{staffMember.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="font-medium">{staffMember.phone}</p>
        </div>
      </div>
    </div>
  )
}