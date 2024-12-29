import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Award, Briefcase, ChevronLeft } from "lucide-react"
import { lawyerProfiles } from "@/data/lawyerProfiles"

interface LawyerProfileProps {
  lawyerId: string
  onBack: () => void
}

export function LawyerProfile({ lawyerId, onBack }: LawyerProfileProps) {
  const lawyer = lawyerProfiles.find(l => l.id === lawyerId)

  if (!lawyer) {
    return null
  }

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to List
      </Button>

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
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{lawyer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{lawyer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{lawyer.currentCaseload} Active Cases</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {lawyer.specialization.map((spec) => (
                <Badge key={spec} variant="secondary">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Education</h3>
            <div className="space-y-2">
              {lawyer.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}, {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Achievements</h3>
            <div className="space-y-2">
              {lawyer.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}