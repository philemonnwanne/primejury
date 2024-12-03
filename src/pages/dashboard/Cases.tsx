import { DashboardLayout } from "@/layouts/DashboardLayout"
import { CaseList } from "@/components/cases/CaseList"
import { CaseFilters } from "@/components/cases/CaseFilters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CaseDetails } from "@/components/cases/CaseDetails"
import { useState } from "react"

export default function Cases() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Cases</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Case
          </Button>
        </div>

        <div className="flex flex-col space-y-8">
          <CaseFilters />
          <Sheet>
            <SheetTrigger asChild>
              <div className="w-full">
                <CaseList onCaseSelect={setSelectedCaseId} />
              </div>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]" side="right">
              {selectedCaseId && <CaseDetails caseId={selectedCaseId} />}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </DashboardLayout>
  )
}