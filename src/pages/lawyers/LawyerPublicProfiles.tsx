import { LawyerPublicProfilesList } from "@/components/lawyers/LawyerPublicProfilesList"
import { LawyerPublicProfilesSidebar } from "@/components/lawyers/LawyerPublicProfilesSidebar"

export default function LawyerPublicProfiles() {
  return (
    <div className="flex min-h-screen">
      <LawyerPublicProfilesSidebar />
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Find a Lawyer</h1>
          </div>
          <LawyerPublicProfilesList />
        </div>
      </main>
    </div>
  )
}