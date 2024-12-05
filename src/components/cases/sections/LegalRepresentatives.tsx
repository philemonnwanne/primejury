import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

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
  const [showLawyerProfile, setShowLawyerProfile] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Legal Representatives</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Assigned Lawyer</p>
              <Button 
                variant="link" 
                className="h-auto p-0 text-primary hover:underline"
                onClick={() => setShowLawyerProfile(true)}
              >
                {lawyer.name}
              </Button>
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

      <Dialog open={showLawyerProfile} onOpenChange={setShowLawyerProfile}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Lawyer Profile</DialogTitle>
            <DialogDescription>
              Overview of {lawyer.name}'s professional background
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Contact Information</h4>
              <p className="text-sm text-muted-foreground">{lawyer.email}</p>
              <p className="text-sm text-muted-foreground">{lawyer.phone}</p>
            </div>
            {lawyer.specialization && (
              <div>
                <h4 className="text-sm font-medium">Specialization</h4>
                <Badge variant="secondary" className="mt-1">
                  {lawyer.specialization}
                </Badge>
              </div>
            )}
            {lawyer.yearsOfExperience && (
              <div>
                <h4 className="text-sm font-medium">Experience</h4>
                <p className="text-sm text-muted-foreground">{lawyer.yearsOfExperience} years</p>
              </div>
            )}
            {lawyer.activeCases !== undefined && (
              <div>
                <h4 className="text-sm font-medium">Current Workload</h4>
                <p className="text-sm text-muted-foreground">{lawyer.activeCases} active cases</p>
              </div>
            )}
            {lawyer.successRate && (
              <div>
                <h4 className="text-sm font-medium">Success Rate</h4>
                <p className="text-sm text-muted-foreground">{lawyer.successRate}</p>
              </div>
            )}
            {lawyer.education && (
              <div>
                <h4 className="text-sm font-medium">Education</h4>
                <p className="text-sm text-muted-foreground">{lawyer.education}</p>
              </div>
            )}
            {lawyer.barAdmission && (
              <div>
                <h4 className="text-sm font-medium">Bar Admission</h4>
                <p className="text-sm text-muted-foreground">{lawyer.barAdmission}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}