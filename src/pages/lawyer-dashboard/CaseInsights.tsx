import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { CaseList } from "@/components/cases/CaseList"
import { CaseTimeline } from "@/components/cases/CaseTimeline"
import { PreviousCaseCard } from "@/components/cases/PreviousCaseCard"
import { CreateCaseDialog } from "@/components/cases/CreateCaseDialog"
import { IntakeFormDialog } from "@/components/cases/IntakeFormDialog"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LawyerCaseDetails } from "@/components/lawyer-dashboard/case-insights/LawyerCaseDetails"
import { useSearchParams } from "react-router-dom"

export default function LawyerCaseInsights() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "current")

  // Mock data - in a real app, this would come from an API or state management
  const mockCases = [
    {
      id: "1",
      title: "Smith vs. Johnson",
      type: "Civil Litigation",
      status: "active"
    },
    // ... other mock cases
  ]

  const selectedCase = mockCases.find(c => c.id === selectedCaseId)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {selectedCase ? selectedCase.title : "Case Insights"}
            </h1>
            <p className="text-muted-foreground">
              {selectedCase ? "Case Details" : "Manage and track all your cases in detail"}
            </p>
          </div>
          <div className="flex gap-2">
            <CreateCaseDialog />
            <IntakeFormDialog />
          </div>
        </div>

        {selectedCaseId ? (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedCaseId(null)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to case list
            </button>
            <LawyerCaseDetails caseId={selectedCaseId} />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="current">Active Cases</TabsTrigger>
              <TabsTrigger value="past">Inactive Cases</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="space-y-6">
              <CaseList onCaseSelect={setSelectedCaseId} filter="active" />
            </TabsContent>
            <TabsContent value="past" className="space-y-6">
              <CaseList onCaseSelect={setSelectedCaseId} filter="inactive" />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </LawyerDashboardLayout>
  )
}
