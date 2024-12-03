import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, Calculator } from "lucide-react"

const integrations = [
  {
    id: "calendar",
    name: "Calendar Integration",
    description: "Connect to Google or Outlook Calendar",
    icon: Calendar,
    connected: false,
  },
  {
    id: "docusign",
    name: "DocuSign",
    description: "Enable electronic document signing",
    icon: FileText,
    connected: true,
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Connect your accounting software",
    icon: Calculator,
    connected: false,
  },
]

export function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Integrations</h2>
          <p className="text-muted-foreground">Manage your connected services</p>
        </div>
      </div>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-md">
                  <integration.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant={integration.connected ? "destructive" : "default"}>
                {integration.connected ? "Disconnect" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}