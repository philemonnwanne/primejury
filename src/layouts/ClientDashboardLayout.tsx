import { SidebarProvider } from "@/components/ui/sidebar"
import { ClientDashboardSidebar } from "@/components/client-dashboard/ClientDashboardSidebar"
import { ClientDashboardHeader } from "@/components/client-dashboard/ClientDashboardHeader"

interface ClientDashboardLayoutProps {
  children: React.ReactNode
}

export function ClientDashboardLayout({ children }: ClientDashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <ClientDashboardSidebar />
        <div className="flex-1 flex flex-col">
          <ClientDashboardHeader />
          <main className="flex-1 p-6 bg-background">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}