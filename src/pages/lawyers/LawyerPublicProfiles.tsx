import { DashboardLayout } from "@/layouts/DashboardLayout"
import { LawyerPublicProfilesList } from "@/components/lawyers/LawyerPublicProfilesList"
import { LawyerPublicProfilesSidebar } from "@/components/lawyers/LawyerPublicProfilesSidebar"

export default function LawyerPublicProfiles() {
  return (
    <DashboardLayout>
      <div className="container flex gap-6 py-6">
        <LawyerPublicProfilesSidebar />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Find a Lawyer</h1>
          </div>
          <LawyerPublicProfilesList />
        </div>
      </div>
    </DashboardLayout>
  )
}