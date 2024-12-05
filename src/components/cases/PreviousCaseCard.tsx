import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Calendar,
  User,
  Gavel,
  MapPin,
  FileText,
  Scale,
  Clock
} from "lucide-react"

interface CaseDocument {
  id: string
  title: string
  type: string
  dateAdded: string
}

interface PreviousCase {
  id: string
  title: string
  type: string
  duration: {
    startDate: string
    endDate: string
    totalDays: number
  }
  description: string
  lawyer: {
    name: string
    id: string
  }
  documents: CaseDocument[]
  disposition: string
  judge: string
  location: {
    city: string
    state: string
    county: string
  }
  status: "won" | "lost" | "settled" | "dismissed"
}

interface PreviousCaseCardProps {
  caseData: PreviousCase
}

export function PreviousCaseCard({ caseData }: PreviousCaseCardProps) {
  const statusColors = {
    won: "bg-green-500",
    lost: "bg-red-500",
    settled: "bg-blue-500",
    dismissed: "bg-gray-500",
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{caseData.title}</CardTitle>
            <CardDescription>{caseData.type}</CardDescription>
          </div>
          <Badge className={statusColors[caseData.status]}>
            {caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium">Case Description</h4>
          <p className="text-sm text-muted-foreground">{caseData.description}</p>
        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">
                  {caseData.duration.startDate} - {caseData.duration.endDate}
                  <br />
                  ({caseData.duration.totalDays} days)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Assigned Lawyer</p>
                <p className="text-sm text-muted-foreground">{caseData.lawyer.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Gavel className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Presiding Judge</p>
                <p className="text-sm text-muted-foreground">{caseData.judge}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {caseData.location.city}, {caseData.location.state}
                  <br />
                  {caseData.location.county} County
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Disposition</p>
                <p className="text-sm text-muted-foreground">{caseData.disposition}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-4">Associated Documents</h4>
          <div className="space-y-2">
            {caseData.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">{doc.type}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{doc.dateAdded}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}