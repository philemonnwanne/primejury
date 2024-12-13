import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Clock, ScrollText, FileText } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CaseOverviewProps {
  estimatedDuration: string
  subject: string
  intakeFormId?: string
}

export function CaseOverview({ 
  estimatedDuration: initialDuration,
  subject: initialSubject,
  intakeFormId 
}: CaseOverviewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [duration, setDuration] = useState(initialDuration)
  const [subject, setSubject] = useState(initialSubject)
  const { toast } = useToast()

  const handleSave = () => {
    // In a real app, this would make an API call
    toast({
      title: "Overview Updated",
      description: "Case overview has been updated successfully.",
    })
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Case Overview</CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Overview
          </Button>
        ) : (
          <Button onClick={handleSave}>Save Changes</Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium">Estimated Duration</p>
            {isEditing ? (
              <Input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6-8 months"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{duration}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ScrollText className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium">Case Subject</p>
            {isEditing ? (
              <Textarea
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{subject}</p>
            )}
          </div>
        </div>

        {intakeFormId && (
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Intake Form</p>
              <Button 
                variant="link" 
                className="h-auto p-0 text-primary hover:text-primary/80 hover:underline"
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