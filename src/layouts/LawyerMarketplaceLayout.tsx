import { SidebarProvider } from "@/components/ui/sidebar"
import { LawyerPublicProfilesSidebar } from "@/components/lawyers/LawyerPublicProfilesSidebar"

interface LawyerMarketplaceLayoutProps {
  children: React.ReactNode
}

export function LawyerMarketplaceLayout({ children }: LawyerMarketplaceLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <LawyerPublicProfilesSidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}