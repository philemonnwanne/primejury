import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BillingOverview } from "@/components/finance/BillingOverview"
import { BillingCaseList } from "@/components/finance/BillingCaseList"
import { PaymentStructures } from "@/components/finance/PaymentStructures"
import { PaymentRequests } from "@/components/finance/PaymentRequests"
import { BillingReports } from "@/components/finance/BillingReports"

export default function LawyerBilling() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing Management</h1>
          <p className="text-muted-foreground">
            Manage case billing, payment structures, and client payments
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cases">Case Billing</TabsTrigger>
            <TabsTrigger value="structures">Payment Structures</TabsTrigger>
            <TabsTrigger value="requests">Payment Requests</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <BillingOverview />
          </TabsContent>

          <TabsContent value="cases">
            <BillingCaseList />
          </TabsContent>

          <TabsContent value="structures">
            <PaymentStructures />
          </TabsContent>

          <TabsContent value="requests">
            <PaymentRequests />
          </TabsContent>

          <TabsContent value="reports">
            <BillingReports />
          </TabsContent>
        </Tabs>
      </div>
    </LawyerDashboardLayout>
  )
}