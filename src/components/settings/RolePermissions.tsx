import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const permissions = [
  { id: "view_cases", label: "View Cases", description: "Can view case details and updates" },
  { id: "edit_cases", label: "Edit Cases", description: "Can modify case information" },
  { id: "manage_tasks", label: "Manage Tasks", description: "Can create and assign tasks" },
  { id: "upload_docs", label: "Upload Documents", description: "Can upload and manage documents" },
  { id: "view_analytics", label: "View Analytics", description: "Can access analytics dashboard" },
]

export function RolePermissions() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Role Permissions</h2>
          <p className="text-muted-foreground">Manage role-based access control</p>
        </div>
      </div>

      <div className="grid gap-4">
        {permissions.map((permission) => (
          <Card key={permission.id}>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{permission.label}</CardTitle>
              <CardDescription>{permission.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor={permission.id}>Enable for all users</Label>
                <Switch id={permission.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}