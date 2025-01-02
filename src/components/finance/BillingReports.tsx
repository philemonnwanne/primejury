import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { BillingReport } from "./BillingReport"

export function BillingReports() {
  const [reportData, setReportData] = useState([])

  // Function to fetch or generate report data
  const fetchReportData = async () => {
    // Mock fetching data
    const data = await new Promise(resolve => {
      setTimeout(() => {
        resolve([{ id: 1, amount: 100 }, { id: 2, amount: 200 }])
      }, 1000)
    })
    setReportData(data)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Billing Reports</h1>
      <Button onClick={fetchReportData}>Generate Report</Button>

      {reportData.length > 0 && (
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
