import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { BillingReport } from "./BillingReport"

interface BillingReportData {
  type: string;
  date: string;
  totalBilled: number;
  totalPaid: number;
  outstandingAmount: number;
  cases: Array<{
    id: string;
    title: string;
    billedAmount: number;
    paidAmount: number;
    status: string;
  }>;
}

export function BillingReports() {
  const [reportData, setReportData] = useState<BillingReportData | null>(null)

  const fetchReportData = async () => {
    // Mock fetching data
    const data: BillingReportData = {
      type: "Monthly",
      date: new Date().toISOString(),
      totalBilled: 10000,
      totalPaid: 8000,
      outstandingAmount: 2000,
      cases: [
        {
          id: "1",
          title: "Case 1",
          billedAmount: 5000,
          paidAmount: 4000,
          status: "partial"
        }
      ]
    }
    setReportData(data)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Billing Reports</h1>
      <Button onClick={fetchReportData}>Generate Report</Button>

      {reportData && (
        <PDFDownloadLink
          document={<BillingReport data={reportData} />}
          fileName={`billing-report-${new Date().toISOString()}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading}>
              {loading ? "Generating..." : "Download Report"}
            </Button>
          )}
        </PDFDownloadLink>
      )}
    </div>
  )
}