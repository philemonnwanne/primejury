import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Gavel, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface LawyerProfile {
  id: string
  name: string
  email: string
  phone: string
  specialization?: string
  yearsOfExperience?: number
  activeCases?: number
  successRate?: string
  education?: string
  barAdmission?: string
}

interface LegalRepresentativesProps {
  lawyer: LawyerProfile
  judge: string
}

export function LegalRepresentatives({ lawyer, judge }: LegalRepresentativesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Representatives</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Assigned Lawyer</p>
              <Link 
                to={`/lawyers/${lawyer.id}`}
                className="text-primary hover:underline"
              >
                {lawyer.name}
              </Link>
              <p className="text-sm text-muted-foreground">{lawyer.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <Link to={`/client-dashboard/communications/${lawyer.id}`}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Gavel className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">Presiding Judge</p>
            <p className="text-sm text-muted-foreground">{judge}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}