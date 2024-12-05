import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { lawyerProfiles } from "@/data/lawyerProfiles"
import { Link } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LawyerProfilesSidebar } from "@/components/lawyers/LawyerProfilesSidebar"

export default function LawyerProfiles() {
  const [filters, setFilters] = useState({
    state: 'all',
    specialty: 'all',
    yearsOfExperience: 'all',
    successRate: [0, 100] as [number, number],
    proBono: false,
    workload: 'all',
    gender: 'all',
    ethnicity: 'all'
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredLawyers = lawyerProfiles.filter(lawyer => {
    if (filters.state !== 'all' && !lawyer.barAdmissions.some(admission => admission.includes(filters.state))) {
      return false;
    }
    if (filters.specialty !== 'all' && !lawyer.specialization.some(s => s.toLowerCase().includes(filters.specialty))) {
      return false;
    }
    if (filters.successRate[0] > lawyer.successRate || filters.successRate[1] < lawyer.successRate) {
      return false;
    }
    // Add more filter conditions as needed
    return true;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <LawyerProfilesSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <div className="flex-1">
          <div className="container py-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Lawyer Profiles</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLawyers.map((lawyer) => (
                <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{lawyer.name}</span>
                      <Badge variant="secondary">{lawyer.title}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{lawyer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{lawyer.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {lawyer.specialization.map((spec) => (
                          <Badge key={spec} variant="outline">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <Link to={`/lawyers/${lawyer.id}`}>
                        <Button className="w-full">View Profile</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}