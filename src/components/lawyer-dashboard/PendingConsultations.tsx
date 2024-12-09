import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Consultation {
  id: string
  clientName: string
  caseTitle: string
  date: string
  time: string
  type: "initial" | "follow-up" | "urgent"
}

const mockConsultations: Consultation[] = [
  {
    id: "1",
    clientName: "John Smith",
    caseTitle: "Property Dispute",
    date: "2024-03-20",
    time: "10:00 AM",
    type: "initial",
  },
  {
    id: "2",
    clientName: "Sarah Johnson",
    caseTitle: "Contract Review",
    date: "2024-03-21",
    time: "2:30 PM",
    type: "follow-up",
  },
  {
    id: "3",
    clientName: "Michael Brown",
    caseTitle: "Employment Case",
    date: "2024-03-22",
    time: "11:00 AM",
    type: "urgent",
  },
]

export function PendingConsultations() {
  return (
    <Card className="col-span-full md:col-span-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Pending Consultations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockConsultations.map((consultation) => (
            <div
              key={consultation.id}
              className="flex flex-col space-y-2 rounded-lg border p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{consultation.clientName}</h3>
                  <p className="text-sm text-muted-foreground">{consultation.caseTitle}</p>
                </div>
                <Badge
                  variant={
                    consultation.type === "urgent"
                      ? "destructive"
                      : consultation.type === "initial"
                      ? "default"
                      : "secondary"
                  }
                >
                  {consultation.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{new Date(consultation.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{consultation.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}