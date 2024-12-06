import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LawyerPublicProfilesSidebar } from "@/components/lawyers/LawyerPublicProfilesSidebar"

interface LawyerMarketplaceLayoutProps {
  children: React.ReactNode
}

export function LawyerMarketplaceLayout({ children }: LawyerMarketplaceLayoutProps) {
  const [filters, setFilters] = useState({
    state: "all",
    specialty: "all",
    yearsOfExperience: "all",
    successRate: [0, 100] as [number, number],
    proBono: false,
    workload: "all",
    gender: "all",
    ethnicity: "all"
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <LawyerPublicProfilesSidebar 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}