import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { UrgentNotifications } from "@/components/client-dashboard/overview/UrgentNotifications"
import { CaseProgressList } from "@/components/client-dashboard/overview/CaseProgressList"
import { NewsFeedOverview } from "@/components/client-dashboard/overview/NewsFeedOverview"
import { BillingOverview } from "@/components/client-dashboard/overview/BillingOverview"
import { CaseBidsOverview } from "@/components/client-dashboard/overview/CaseBidsOverview"

export default function ClientDashboard() {
  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">
            Here's an overview of your legal matters
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <UrgentNotifications />
          <CaseBidsOverview />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CaseProgressList />
          <NewsFeedOverview />
        </div>

        <BillingOverview />
      </div>
    </ClientDashboardLayout>
  )
}