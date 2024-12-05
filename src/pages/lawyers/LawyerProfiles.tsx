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
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
  const [successRateRange, setSuccessRateRange] = useState<[number, number]>([0, 100])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const handleSpecializationChange = (specialization: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(specialization)
        ? prev.filter((s) => s !== specialization)
        : [...prev, specialization]
    )
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    )
  }

  const filteredLawyers = lawyerProfiles.filter((lawyer) => {
    const matchesSpecialization =
      selectedSpecializations.length === 0 ||
      lawyer.specialization.some((s) => selectedSpecializations.includes(s))

    const matchesSuccessRate =
      lawyer.successRate >= successRateRange[0] && lawyer.successRate <= successRateRange[1]

    const matchesLanguage =
      selectedLanguages.length === 0 ||
      lawyer.languages.some((l) => selectedLanguages.includes(l))

    return matchesSpecialization && matchesSuccessRate && matchesLanguage
  })

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <LawyerProfilesSidebar
          selectedSpecializations={selectedSpecializations}
          onSpecializationChange={handleSpecializationChange}
          successRateRange={successRateRange}
          onSuccessRateChange={setSuccessRateRange}
          selectedLanguages={selectedLanguages}
          onLanguageChange={handleLanguageChange}
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