import { LawyerPublicProfilesList } from "@/components/lawyers/LawyerPublicProfilesList"
import { LawyerPublicProfilesSidebar } from "@/components/lawyers/LawyerPublicProfilesSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function LawyerPublicProfiles() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
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
    </SidebarProvider>
  )
}