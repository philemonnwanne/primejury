import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database } from "lucide-react"

const caseTypes = [
  { type: "Criminal Defense", count: 12 },
  { type: "Civil Litigation", count: 8 },
  { type: "Corporate Law", count: 5 },
  { type: "Family Law", count: 7 },
]

export function ActiveCasesSummary() {
  const totalCases = caseTypes.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Active Cases Summary</CardTitle>
        <Database className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <p className="text-2xl font-bold">{totalCases}</p>
          <p className="text-sm text-muted-foreground">Total Active Cases</p>
        </div>
        <div className="mt-4 space-y-2">
          {caseTypes.map((caseType) => (
            <div
              key={caseType.type}
              className="flex items-center justify-between rounded-lg border p-2"
            >
              <span className="text-sm font-medium">{caseType.type}</span>
              <Badge variant="secondary">{caseType.count}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}