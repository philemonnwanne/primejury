import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { Briefcase, Mail, Phone, Star } from "lucide-react"
import { PreviousCaseCard } from "@/components/cases/PreviousCaseCard"

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM"
]

export function LawyerProfile() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")

  // Mock data - in a real app, this would be fetched from an API
  const lawyer = {
    id: "1",
    name: "Sarah Parker",
    imageUrl: "/placeholder.svg",
    email: "sarah.parker@example.com",
    phone: "(555) 123-4567",
    specialization: ["Civil Litigation", "Corporate Law"],
    rating: 4.8,
    totalCases: 45,
    successRate: "92%",
    previousCases: [
      {
        id: "case1",
        title: "Smith vs. Johnson",
        type: "Civil Litigation",
        duration: {
          startDate: "2023-01-15",
          endDate: "2023-06-20",
          totalDays: 156
        },
        description: "Contract dispute case resolved through mediation",
        lawyer: {
          name: "Sarah Parker",
          id: "1"
        },
        documents: [
          {
            id: "doc1",
            title: "Final Settlement",
            type: "Legal Document",
            dateAdded: "2023-06-15"
          }
        ],
        disposition: "Settled",
        judge: "Hon. Michael Roberts",
        location: {
          city: "Sacramento",
          state: "California",
          county: "Sacramento",
          courthouse: {
            name: "Sacramento County Superior Court",
            address: "720 9th Street",
            phone: "(555) 555-5555"
          }
        },
        status: "won"
      }
    ]
  }

  const handleScheduleAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time")
      return
    }
    toast.success("Appointment scheduled successfully")
    setSelectedDate(undefined)
    setSelectedTime("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={lawyer.imageUrl} alt={lawyer.name} />
              <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-2xl">{lawyer.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>{lawyer.rating} / 5.0</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {lawyer.specialization.map((spec) => (
                  <Badge key={spec} variant="secondary">{spec}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
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
              <span>{lawyer.totalCases} cases completed ({lawyer.successRate} success rate)</span>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Schedule Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
              
              {selectedDate && (
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              <Button 
                className="w-full" 
                onClick={handleScheduleAppointment}
                disabled={!selectedDate || !selectedTime}
              >
                Schedule Appointment
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Previous Cases</h3>
        <div className="space-y-4">
          {lawyer.previousCases.map((case_) => (
            <PreviousCaseCard key={case_.id} caseData={case_} />
          ))}
        </div>
      </div>
    </div>
  )
}