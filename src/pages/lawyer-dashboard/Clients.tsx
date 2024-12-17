import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { ClientDirectory } from "@/components/lawyer-dashboard/clients/ClientDirectory"
import { ClientInsightsVisuals } from "@/components/lawyer-dashboard/clients/ClientInsightsVisuals"
import { PaymentHistoryTable } from "@/components/lawyer-dashboard/clients/PaymentHistoryTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LawyerClients() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage your client relationships and case information.
          </p>
        </div>

        <ClientInsightsVisuals />
        
        <ClientDirectory />

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentHistoryTable />
          </CardContent>
        </Card>
      </div>
    </LawyerDashboardLayout>
  )
}