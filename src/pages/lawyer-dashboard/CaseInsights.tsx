import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { CaseList } from "@/components/cases/CaseList"
import { CaseTimeline } from "@/components/cases/CaseTimeline"
import { PreviousCaseCard } from "@/components/cases/PreviousCaseCard"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LawyerCaseDetails } from "@/components/lawyer-dashboard/case-insights/LawyerCaseDetails"

export default function LawyerCaseInsights() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("current")

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Case Insights</h1>
            <p className="text-muted-foreground">
              Manage and track all your cases in detail
            </p>
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
              <TabsTrigger value="current">Current Cases</TabsTrigger>
              <TabsTrigger value="past">Past Cases</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="space-y-6">
              <CaseList onCaseSelect={setSelectedCaseId} />
            </TabsContent>
            <TabsContent value="past" className="space-y-6">
              <div className="grid gap-6">
                <PreviousCaseCard
                  caseData={{
                    id: "past1",
                    title: "Smith vs. Johnson",
                    type: "Civil Litigation",
                    duration: {
                      startDate: "2023-01-15",
                      endDate: "2023-06-30",
                      totalDays: 166
                    },
                    description: "Contract dispute regarding construction project delays",
                    lawyer: {
                      name: "Sarah Parker",
                      id: "lawyer1"
                    },
                    documents: [
                      {
                        id: "doc1",
                        title: "Final Settlement Agreement",
                        type: "Legal Document",
                        dateAdded: "2023-06-15"
                      }
                    ],
                    disposition: "Settled",
                    judge: "Hon. Michael Roberts",
                    location: {
                      city: "Sacramento",
                      state: "California",
                      county: "Sacramento",
                      courthouse: {
                        name: "Sacramento County Superior Court",
                        address: "720 9th Street, Sacramento, CA 95814",
                        phone: "(916) 874-5522"
                      }
                    },
                    status: "settled"
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </LawyerDashboardLayout>
  )
}