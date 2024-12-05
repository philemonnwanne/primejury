import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface LegalRepresentativesProps {
  lawyer: {
    id: string
    name: string
    email: string
    phone: string
  }
  judge: string
}

export function LegalRepresentatives({ lawyer, judge }: LegalRepresentativesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Representatives</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">Assigned Lawyer</p>
            <Link 
              to={`/dashboard/staff/${lawyer.id}`}
              className="text-sm text-primary hover:underline"
            >
              {lawyer.name}
            </Link>
            <p className="text-sm text-muted-foreground">{lawyer.email}</p>
          </div>
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