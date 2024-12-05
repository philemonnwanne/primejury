import { useParams } from "react-router-dom"
import { publicLawyerProfiles } from "@/data/publicLawyerProfiles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Award, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { toast } from "sonner"

export default function LawyerProfile() {
  const { id } = useParams()
  const lawyer = publicLawyerProfiles.find(l => l.id === id)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  if (!lawyer) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold">Lawyer not found</h1>
      </div>
    )
  }

  const handleScheduleConsultation = () => {
    if (selectedDate) {
      toast.success("Consultation request sent successfully!")
    } else {
      toast.error("Please select a date for the consultation")
    }
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
                    <Award className="h-4 w-4" />
                    <span>{lawyer.yearsOfExperience} Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{lawyer.currentCaseload} Active Cases</span>
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

              <div className="flex justify-between items-center">
                <Badge variant="secondary">Success Rate: {lawyer.successRate}%</Badge>
                {lawyer.proBono && (
                  <Badge variant="outline" className="bg-green-50">
                    Pro Bono Cases
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
              <Button 
                className="w-full" 
                onClick={handleScheduleConsultation}
              >
                Schedule Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}