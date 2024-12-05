import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, Award, Scale, GraduationCap, Calendar } from "lucide-react"

// Mock data fetch function - replace with actual API call
const fetchLawyerProfile = async (id: string) => {
  // Simulated lawyer profiles database
  const lawyerProfiles = {
    "sp001": {
      id: "sp001",
      name: "Sarah Parker",
      email: "sarah.parker@example.com",
      phone: "(555) 123-4567",
      avatar: "/placeholder.svg",
      firm: "Parker & Associates",
      specialization: "Civil Litigation",
      yearsOfExperience: 15,
      education: "Harvard Law School, J.D.",
      barAdmission: "California State Bar",
      successRate: "92%",
      activeCases: 8,
      awards: ["Best Civil Litigator 2023", "Legal Excellence Award"],
    },
    "mc002": {
      id: "mc002",
      name: "Michael Chang",
      email: "michael.chang@example.com",
      phone: "(555) 234-5678",
      avatar: "/placeholder.svg",
      firm: "Chang Legal Group",
      specialization: "Corporate Law",
      yearsOfExperience: 12,
      education: "Stanford Law School, J.D.",
      barAdmission: "California State Bar",
      successRate: "88%",
      activeCases: 6,
      awards: ["Rising Star in Corporate Law 2023"],
    },
    "ew003": {
      id: "ew003",
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      phone: "(555) 345-6789",
      avatar: "/placeholder.svg",
      firm: "Wilson Law Partners",
      specialization: "Family Law",
      yearsOfExperience: 10,
      education: "UCLA School of Law, J.D.",
      barAdmission: "California State Bar",
      successRate: "90%",
      activeCases: 7,
      awards: ["Family Law Advocate of the Year 2023"],
    },
    "jd002": {
      id: "jd002",
      name: "John Davis",
      email: "john.davis@example.com",
      phone: "(555) 456-7890",
      avatar: "/placeholder.svg",
      firm: "Davis & Partners",
      specialization: "Estate Planning",
      yearsOfExperience: 18,
      education: "Yale Law School, J.D.",
      barAdmission: "California State Bar",
      successRate: "95%",
      activeCases: 5,
      awards: ["Top Estate Planning Attorney 2023", "Lifetime Achievement Award"],
    },
    "er003": {
      id: "er003",
      name: "Emma Roberts",
      email: "emma.roberts@example.com",
      phone: "(555) 567-8901",
      avatar: "/placeholder.svg",
      firm: "Roberts Criminal Defense",
      specialization: "Criminal Defense",
      yearsOfExperience: 14,
      education: "Columbia Law School, J.D.",
      barAdmission: "California State Bar",
      successRate: "87%",
      activeCases: 9,
      awards: ["Criminal Defense Excellence Award 2023"],
    }
  };

  const profile = lawyerProfiles[id];
  if (!profile) {
    throw new Error("Lawyer profile not found");
  }
  return profile;
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