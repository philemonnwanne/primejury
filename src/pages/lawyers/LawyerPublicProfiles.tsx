import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { LawyerPublicProfilesList } from "@/components/lawyers/LawyerPublicProfilesList"
import { LawyerHorizontalFilters } from "@/components/lawyers/LawyerHorizontalFilters"
import { useState } from "react"

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
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-6">Find a Lawyer</h1>
          <LawyerHorizontalFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <LawyerPublicProfilesList />
      </div>
    </ClientDashboardLayout>
  )
}