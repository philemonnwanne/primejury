import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AnalyticsReport } from "@/components/analytics/AnalyticsReport"
import { PDFDownloadLink } from "@react-pdf/renderer"

export function BillingReports() {
  const { toast } = useToast()

  const handleGenerateReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `The ${type} report has been generated successfully.`,
    })
  }

  const reportSections = [
    "caseMetrics",
    "financialMetrics",
    "trends"
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Revenue Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed breakdown of revenue by case type and payment structure
                </p>
                <PDFDownloadLink
                  document={<AnalyticsReport sections={reportSections} />}
                  fileName="monthly-revenue-report.pdf"
                >
                  {({ loading }) => (
                    <Button disabled={loading} asChild>
                      <div className="flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        {loading ? "Loading..." : "Download Report"}
                      </div>
                    </Button>
                  )}
                </PDFDownloadLink>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Collection Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Overview of payment collection status and outstanding balances
                </p>
                <Button onClick={() => handleGenerateReport("payment-collection")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Client Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed history of payments by client and case
                </p>
                <Button onClick={() => handleGenerateReport("payment-history")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Late Payment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analysis of late payments and collection efficiency
                </p>
                <Button onClick={() => handleGenerateReport("late-payment")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}