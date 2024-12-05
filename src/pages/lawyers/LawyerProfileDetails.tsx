import { useParams } from "react-router-dom"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Award, BookOpen, Briefcase, GraduationCap, Globe } from "lucide-react"
import { lawyerProfiles } from "@/data/lawyerProfiles"

export default function LawyerProfileDetails() {
  const { id } = useParams()
  const lawyer = lawyerProfiles.find((l) => l.id === id)

  if (!lawyer) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Lawyer not found</h2>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{lawyer.name}</h1>
            <p className="text-muted-foreground">{lawyer.title}</p>
          </div>
          <Badge variant="secondary">
            {lawyer.successRate}% Success Rate
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{lawyer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{lawyer.phone}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Workload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lawyer.currentCaseload} Active Cases</div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lawyer.education.map((edu, index) => (
                <div key={index} className="space-y-1">
                  <div className="font-medium">{edu.degree}</div>
                  <div className="text-sm text-muted-foreground">
                    {edu.institution}, {edu.year}
                  </div>
                  {index < lawyer.education.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lawyer.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="font-medium">{exp.position}</div>
                    <div className="text-sm text-muted-foreground">{exp.duration}</div>
                  </div>
                  <div className="text-sm">{exp.company}</div>
                  <div className="text-sm text-muted-foreground">{exp.description}</div>
                  {index < lawyer.experience.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2">
                {lawyer.achievements.map((achievement, index) => (
                  <li key={index} className="text-sm">{achievement}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Bar Admissions & Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Bar Admissions</h4>
                <div className="flex flex-wrap gap-2">
                  {lawyer.barAdmissions.map((admission) => (
                    <Badge key={admission} variant="outline">
                      {admission}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {lawyer.languages.map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {lawyer.publications && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Publications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  {lawyer.publications.map((publication, index) => (
                    <li key={index} className="text-sm">{publication}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}