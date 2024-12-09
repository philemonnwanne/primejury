import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LawyerDashboardSidebar } from "@/components/lawyer-dashboard/LawyerDashboardSidebar"
import { LawyerDashboardHeader } from "@/components/lawyer-dashboard/LawyerDashboardHeader"

interface LawyerDashboardLayoutProps {
  children: React.ReactNode
}

export function LawyerDashboardLayout({ children }: LawyerDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarFocus = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarBlur = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SidebarProvider defaultOpen={isSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <div 
          onFocus={handleSidebarFocus}
          onBlur={handleSidebarBlur}
          tabIndex={0}
        >
          <LawyerDashboardSidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <LawyerDashboardHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}