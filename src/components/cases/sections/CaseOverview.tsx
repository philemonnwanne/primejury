import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ScrollText, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CaseOverviewProps {
  estimatedDuration: string
  subject: string
  intakeFormId?: string
}

export function CaseOverview({ estimatedDuration, subject, intakeFormId }: CaseOverviewProps) {
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
        {intakeFormId && (
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Intake Form</p>
              <Button 
                variant="link" 
                className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                onClick={() => window.open(`/intake-forms/${intakeFormId}`, '_blank')}
              >
                View Initial Intake Details
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}