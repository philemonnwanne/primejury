import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ScrollText } from "lucide-react"

interface CaseOverviewProps {
  estimatedDuration: string
  subject: string
}

export function CaseOverview({ estimatedDuration, subject }: CaseOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">Estimated Duration</p>
            <p className="text-sm text-muted-foreground">{estimatedDuration}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ScrollText className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">Case Subject</p>
            <p className="text-sm text-muted-foreground">{subject}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}