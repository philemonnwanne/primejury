import { useState } from "react"
import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { CaseList } from "@/components/cases/CaseList"
import { CaseFilters } from "@/components/cases/CaseFilters"
import { CaseDetails } from "@/components/cases/CaseDetails"

export default function LawyerCases() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Cases</h1>
        </div>

        {selectedCaseId ? (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedCaseId(null)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to case list
            </button>
            <CaseDetails caseId={selectedCaseId} />
          </div>
        ) : (
          <div className="space-y-6">
            <CaseFilters />
            <CaseList onCaseSelect={setSelectedCaseId} />
          </div>
        )}
      </div>
    </LawyerDashboardLayout>
  )
}