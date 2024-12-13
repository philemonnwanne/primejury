import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { ClientDirectory } from "@/components/lawyer-dashboard/clients/ClientDirectory"

export default function LawyerClients() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <ClientDirectory />
      </div>
    </LawyerDashboardLayout>
  )
}