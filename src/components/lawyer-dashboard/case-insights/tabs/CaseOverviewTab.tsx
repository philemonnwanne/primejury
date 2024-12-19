import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CaseOverview } from "@/components/cases/sections/CaseOverview"
import { LegalRepresentatives } from "@/components/cases/sections/LegalRepresentatives"
import { CaseLocation } from "@/components/cases/sections/CaseLocation"
import { SettlementOffers } from "@/components/cases/sections/SettlementOffers"
import { PendingItems } from "@/components/cases/sections/PendingItems"

interface CaseOverviewTabProps {
  isEditing: boolean
  caseData: any // Replace with proper type
  onSave: () => void
}

export function CaseOverviewTab({ isEditing, caseData, onSave }: CaseOverviewTabProps) {
  const [formData, setFormData] = useState(caseData)

  return (
    <div className="space-y-6">
      <PendingItems />

      <Separator />

      <CaseOverview 
        estimatedDuration={formData.estimatedDuration}
        subject={formData.description}
        intakeFormId={formData.intakeFormId}
      />

      <LegalRepresentatives 
        lawyer={formData.lawyer}
        judge={formData.judge}
      />

      <CaseLocation location={formData.location} />

      <SettlementOffers offers={formData.settlementOffers || []} />

      {isEditing && (
        <Button onClick={onSave} className="w-full">
          Save Changes
        </Button>
      )}
    </div>
  )
}
