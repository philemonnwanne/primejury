import { useParams } from "react-router-dom"
import { lawyerProfiles } from "@/data/lawyerProfiles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Award, Briefcase, GraduationCap, Globe, Trophy } from "lucide-react"
import { LawyerCalendar } from "@/components/lawyer-dashboard/LawyerCalendar"

export default function LawyerProfile() {
  const { id } = useParams()
  const lawyer = lawyerProfiles.find(l => l.id === id)

  if (!lawyer) {
    return <div>Lawyer not found</div>
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
                    <Briefcase className="h-4 w-4" />
                    <span>{lawyer.currentCaseload} Active Cases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>{lawyer.successRate}% Success Rate</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {lawyer.specialization.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Education</h3>
                <div className="space-y-2">
                  {lawyer.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <GraduationCap className="h-4 w-4 mt-1" />
                      <div>
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-sm text-muted-foreground">
                          {edu.institution}, {edu.year}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Bar Admissions</h3>
                <div className="flex flex-wrap gap-2">
                  {lawyer.barAdmissions.map((admission) => (
                    <Badge key={admission} variant="outline">
                      {admission}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{lawyer.languages.join(", ")}</span>
                </div>
              </div>

              {lawyer.publications && (
                <div>
                  <h3 className="font-semibold mb-2">Publications</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {lawyer.publications.map((pub, index) => (
                      <li key={index} className="text-sm">{pub}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lawyer.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                    <div className="font-medium">{exp.position}</div>
                    <div className="text-sm text-muted-foreground">{exp.company}</div>
                    <div className="text-sm text-muted-foreground">{exp.duration}</div>
                    <p className="mt-2 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lawyer.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Award className="h-4 w-4 mt-1" />
                    <span className="text-sm">{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <LawyerCalendar />
        </div>
      </div>
    </div>
  )
}