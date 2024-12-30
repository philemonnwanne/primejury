import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { ClientDirectory } from "@/components/lawyer-dashboard/clients/ClientDirectory"
import { PaymentHistoryTable } from "@/components/lawyer-dashboard/clients/PaymentHistoryTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"

export default function LawyerClients() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Lawyer</h1>
            <p className="text-muted-foreground">
              Manage your legal representation and communication.
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link to="/lawyers/marketplace">
              <Search className="h-4 w-4" />
              Search for a New Lawyer
            </Link>
          </Button>
        </div>
        
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