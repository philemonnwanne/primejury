import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { pdf } from "@react-pdf/renderer"
import { AnalyticsReport } from "./AnalyticsReport"
import { useToast } from "@/components/ui/use-toast"

const reportSections = [
  { id: "caseMetrics", label: "Case Metrics" },
  { id: "lawyerPerformance", label: "Lawyer Performance" },
  { id: "financialMetrics", label: "Financial Metrics" },
  { id: "trends", label: "Trends Analysis" },
]

export function ReportGenerator() {
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const { toast } = useToast()

  const handleGenerateReport = async () => {
    if (selectedSections.length === 0) {
      toast({
        title: "No sections selected",
        description: "Please select at least one section for the report",
        variant: "destructive",
      })
      return
    }

    try {
      const blob = await pdf(
        <AnalyticsReport sections={selectedSections} />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `analytics-report-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Report generated successfully",
        description: "Your report has been downloaded",
      })
    } catch (error) {
      toast({
        title: "Error generating report",
        description: "Please try again later",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4">
            {reportSections.map((section) => (
              <div key={section.id} className="flex items-center space-x-2">
                <Checkbox
                  id={section.id}
                  checked={selectedSections.includes(section.id)}
                  onCheckedChange={(checked) => {
                    setSelectedSections(
                      checked
                        ? [...selectedSections, section.id]
                        : selectedSections.filter((id) => id !== section.id)
                    )
                  }}
                />
                <Label htmlFor={section.id}>{section.label}</Label>
              </div>
            ))}
          </div>
          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </div>
      </CardContent>
    </Card>
  )
}