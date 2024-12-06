import { useParams } from "react-router-dom"
import { lawyerProfiles } from "@/data/lawyerProfiles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Award, Briefcase, Building2, GraduationCap, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { LawyerMarketplaceLayout } from "@/layouts/LawyerMarketplaceLayout"

// Available time slots for consultations
const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM"
]

// Get next 5 available dates (excluding weekends)
const getNextAvailableDates = () => {
  const dates: Date[] = [];
  let currentDate = new Date();
  
  while (dates.length < 5) {
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      dates.push(new Date(currentDate));
    }
  }
  
  return dates;
};

export default function LawyerProfile() {
  const { id } = useParams()
  const lawyer = lawyerProfiles.find(l => l.id === id)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const availableDates = getNextAvailableDates()

  if (!lawyer) {
    return (
      <LawyerMarketplaceLayout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold">Lawyer not found</h1>
        </div>
      </LawyerMarketplaceLayout>
    )
  }

  const handleScheduleConsultation = () => {
    if (selectedDate && selectedTime) {
      toast.success("Consultation scheduled successfully!")
      setSelectedDate(undefined)
      setSelectedTime("")
    } else {
      toast.error("Please select both a date and time for the consultation")
    }
  }

  return (
    <LawyerMarketplaceLayout>
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
                      <span>{lawyer.experience[0].company}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </h3>
                  <div className="space-y-2">
                    {lawyer.education.map((edu, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-sm text-muted-foreground">
                          {edu.institution}, {edu.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {lawyer.experience.map((exp, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-medium">{exp.position}</div>
                        <div className="text-sm text-muted-foreground">
                          {exp.company} • {exp.duration}
                        </div>
                        <p className="text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements & Certifications
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {lawyer.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm">{achievement}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Bar Admissions & Languages
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium mb-2">Bar Admissions</div>
                      <div className="flex flex-wrap gap-2">
                        {lawyer.barAdmissions.map((admission, index) => (
                          <Badge key={index} variant="secondary">{admission}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Languages</div>
                      <div className="flex flex-wrap gap-2">
                        {lawyer.languages.map((language, index) => (
                          <Badge key={index} variant="outline">{language}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
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
                  disabled={(date) => {
                    return (
                      date < new Date() || 
                      !availableDates.some(d => 
                        d.toDateString() === date.toDateString()
                      )
                    )
                  }}
                />
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Next Available Dates:</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {availableDates.map((date, index) => (
                      <div key={index}>
                        {date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Available Times:</h4>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  onClick={handleScheduleConsultation}
                  disabled={!selectedDate || !selectedTime}
                >
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LawyerMarketplaceLayout>
  )
}
