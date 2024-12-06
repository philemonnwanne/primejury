import { useState } from "react"
import { LawyerPublicProfilesList } from "@/components/lawyers/LawyerPublicProfilesList"
import { LawyerPublicProfilesSidebar } from "@/components/lawyers/LawyerPublicProfilesSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function LawyerPublicProfiles() {
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