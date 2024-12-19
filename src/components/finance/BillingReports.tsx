import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { BillingReport } from "./BillingReport"
import { useState } from "react"

export function BillingReports() {
  const [reportType, setReportType] = useState("monthly")
  const [reportDate, setReportDate] = useState("")
  const [reportData, setReportData] = useState(null)

  const generateReport = () => {
    // Mock report data generation
    const mockData = {
      type: reportType,
      date: reportDate,
      totalBilled: 45000,
      totalPaid: 35000,
      outstandingAmount: 10000,
      cases: [
        {
          id: "1",
          title: "Smith vs. Johnson",
          billedAmount: 15000,
          paidAmount: 12000,
          status: "partial"
        },
        {
          id: "2",
          title: "Tech Corp Merger",
          billedAmount: 30000,
          paidAmount: 23000,
          status: "partial"
        }
      ]
    }
    setReportData(mockData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Billing Reports</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="quarterly">Quarterly Report</SelectItem>
                <SelectItem value="annual">Annual Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Report Date</Label>
            <Input
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button onClick={generateReport}>Generate Report</Button>
          {reportData && (
            <PDFDownloadLink
              document={<BillingReport data={reportData} />}
              fileName={`billing-report-${reportDate}.pdf`}
            >
              {({ loading }) => (
                <Button disabled={loading}>
                  {loading ? "Generating..." : "Download Report"}
                </Button>
              )}
            </PDFDownloadLink>
          )}
        </div>
      </CardContent>
    </Card>
  )
}