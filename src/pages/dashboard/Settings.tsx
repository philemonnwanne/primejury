import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RolePermissions } from "@/components/settings/RolePermissions"
import { NotificationPreferences } from "@/components/settings/NotificationPreferences"
import { IntegrationSettings } from "@/components/settings/IntegrationSettings"

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="roles" className="space-y-4">
          <TabsList>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="roles" className="space-y-4">
            <RolePermissions />
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <NotificationPreferences />
          </TabsContent>
          <TabsContent value="integrations" className="space-y-4">
            <IntegrationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}