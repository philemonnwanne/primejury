import { SidebarProvider } from "@/components/ui/sidebar"
import { LawyerDashboardSidebar } from "@/components/lawyer-dashboard/LawyerDashboardSidebar"
import { LawyerDashboardHeader } from "@/components/lawyer-dashboard/LawyerDashboardHeader"

interface LawyerDashboardLayoutProps {
  children: React.ReactNode
}

export function LawyerDashboardLayout({ children }: LawyerDashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <LawyerDashboardSidebar />
        <div className="flex-1 flex flex-col">
          <LawyerDashboardHeader />
          <main className="flex-1 p-6 bg-background">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}