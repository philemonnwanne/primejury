import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { LawyerPublicProfilesList } from "@/components/lawyers/LawyerPublicProfilesList"
import { LawyerPublicProfilesSidebar } from "@/components/lawyers/LawyerPublicProfilesSidebar"

export default function LawyerPublicProfiles() {
  return (
    <ClientDashboardLayout>
      <div className="flex gap-6">
        <LawyerPublicProfilesSidebar />
        <div className="flex-1">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Find a Lawyer</h1>
            </div>
            <LawyerPublicProfilesList />
          </div>
        </div>
      </div>
    </ClientDashboardLayout>
  )
}