import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, Award, Scale, GraduationCap, Calendar } from "lucide-react"

// Mock data fetch function - replace with actual API call
const fetchLawyerProfile = async (id: string) => {
  // Simulated API response
  return {
    id,
    name: "Sarah Palmer",
    email: "sarah.palmer@example.com",
    phone: "(555) 123-4567",
    avatar: "/placeholder.svg",
    firm: "Palmer & Associates",
    specialization: "Corporate Law",
    yearsOfExperience: 15,
    education: "Harvard Law School, J.D.",
    barAdmission: "California State Bar",
    successRate: "92%",
    activeCases: 8,
    awards: ["Best Corporate Lawyer 2023", "Legal Excellence Award"],
  }
}

export default function LawyerPublicProfile() {
  const { id } = useParams()
  const { data: lawyer, isLoading } = useQuery({
    queryKey: ["lawyer", id],
    queryFn: () => fetchLawyerProfile(id || ""),
    enabled: !!id,
  })

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!lawyer) {
    return <div className="p-8">Lawyer not found</div>
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <Card>
        <CardHeader className="space-y-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
              <AvatarFallback>{lawyer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <CardTitle className="text-3xl">{lawyer.name}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">{lawyer.specialization}</Badge>
                <Badge variant="outline">{lawyer.successRate} Success Rate</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                {lawyer.firm}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {lawyer.email}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {lawyer.phone}
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Professional Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Scale className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Bar Admission:</span> {lawyer.barAdmission}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Experience:</span> {lawyer.yearsOfExperience} years
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Education:</span> {lawyer.education}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Achievements</h3>
              <div className="space-y-2">
                {lawyer.awards.map((award, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    {award}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="rounded-lg bg-muted p-4">
            <div className="text-sm font-medium">Current Workload</div>
            <div className="mt-2 text-2xl font-bold">{lawyer.activeCases} Active Cases</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}