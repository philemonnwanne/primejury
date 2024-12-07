import { SidebarProvider } from "@/components/ui/sidebar"
import { ClientDashboardSidebar } from "@/components/client-dashboard/ClientDashboardSidebar"
import { ClientDashboardHeader } from "@/components/client-dashboard/ClientDashboardHeader"
import { NotificationPanel } from "@/components/notifications/NotificationPanel"
import { useState } from "react"

interface ClientDashboardLayoutProps {
  children: React.ReactNode
}

export function ClientDashboardLayout({ children }: ClientDashboardLayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <ClientDashboardSidebar />
        <div className="flex-1 flex flex-col">
          <ClientDashboardHeader onNotificationClick={() => setShowNotifications(!showNotifications)} />
          <main className="flex-1 p-6 bg-background relative">
            {showNotifications && (
              <div className="absolute top-0 right-0 z-50 mt-2 mr-2">
                <NotificationPanel />
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}