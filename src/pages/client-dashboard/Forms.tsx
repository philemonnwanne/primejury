import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

const formCategories = {
  federal: [
    {
      title: "Federal Tax Form",
      description: "Standard federal tax documentation for legal proceedings",
      category: "Tax Law",
    },
    {
      title: "Bankruptcy Petition",
      description: "Official bankruptcy filing documentation",
      category: "Bankruptcy Law",
    },
  ],
  state: [
    {
      title: "State Court Complaint",
      description: "Initial filing document for state court proceedings",
      category: "Civil Law",
    },
    {
      title: "Divorce Petition",
      description: "State-specific divorce filing documentation",
      category: "Family Law",
    },
  ],
  local: [
    {
      title: "Local Business License",
      description: "Municipal business registration form",
      category: "Business Law",
    },
    {
      title: "Zoning Permit",
      description: "Local zoning and planning documentation",
      category: "Property Law",
    },
  ],
}

export default function ClientForms() {
  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Legal Forms</h1>
          <p className="text-muted-foreground">
            Access and fill out legal forms for your cases
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="federal">
          <TabsList>
            <TabsTrigger value="federal">Federal</TabsTrigger>
            <TabsTrigger value="state">State</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
          </TabsList>
          {(Object.keys(formCategories) as Array<keyof typeof formCategories>).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {formCategories[tab].map((form) => (
                <Card key={form.title}>
                  <CardHeader>
                    <CardTitle className="text-xl">{form.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{form.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {form.category}
                      </span>
                      <Button>Fill Out Form</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </ClientDashboardLayout>
  )
}