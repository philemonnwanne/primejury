import { useParams } from "react-router-dom"
import { lawyerProfiles } from "@/data/lawyerProfiles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Award, Briefcase, Building2, GraduationCap, Globe2 } from "lucide-react"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"
import { Separator } from "@/components/ui/separator"

export default function LawyerProfile() {
  const { id } = useParams()
  const lawyer = lawyerProfiles.find(l => l.id === id)

  if (!lawyer) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold">Lawyer not found</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={lawyer.imageUrl} alt={lawyer.name} />
                  <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{lawyer.name}</CardTitle>
                  <Badge className="mt-1">{lawyer.title}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{lawyer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{lawyer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>Current Law Firm</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {lawyer.specialization.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Education</h3>
                <div className="space-y-4">
                  {lawyer.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <GraduationCap className="h-5 w-5 mt-1" />
                      <div>
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.institution}, {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>
                <div className="space-y-4">
                  {lawyer.experience.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="font-medium">{exp.position}</p>
                        <span className="text-sm text-muted-foreground">{exp.duration}</span>
                      </div>
                      <p className="text-sm">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Achievements & Recognition</h3>
                <ul className="list-disc list-inside space-y-2">
                  {lawyer.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm">{achievement}</li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Bar Admissions</h3>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.barAdmissions.map((admission, index) => (
                      <Badge key={index} variant="outline">{admission}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Languages</h3>
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    <span>{lawyer.languages.join(", ")}</span>
                  </div>
                </div>

                {lawyer.publications && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Publications</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {lawyer.publications.map((publication, index) => (
                        <li key={index} className="text-sm">{publication}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <LawyerCalendar lawyerId={lawyer.id} />
        </div>
      </div>
    </div>
  )
}