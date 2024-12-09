import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface LimitationCase {
  id: string
  caseTitle: string
  limitationDate: string
  daysRemaining: number
  type: string
}

const mockCases: LimitationCase[] = [
  {
    id: "1",
    caseTitle: "Smith vs. Corp Ltd",
    limitationDate: "2024-04-15",
    daysRemaining: 28,
    type: "Civil Litigation",
  },
  {
    id: "2",
    caseTitle: "Estate of Johnson",
    limitationDate: "2024-04-01",
    daysRemaining: 14,
    type: "Probate",
  },
  {
    id: "3",
    caseTitle: "Brown Insurance Claim",
    limitationDate: "2024-03-25",
    daysRemaining: 7,
    type: "Insurance",
  },
]

export function LimitationStatus() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Status of Limitation</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Limitation Date</TableHead>
              <TableHead>Days Remaining</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCases.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell className="font-medium">{case_.caseTitle}</TableCell>
                <TableCell>{case_.type}</TableCell>
                <TableCell>{new Date(case_.limitationDate).toLocaleDateString()}</TableCell>
                <TableCell>{case_.daysRemaining}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      case_.daysRemaining <= 7
                        ? "destructive"
                        : case_.daysRemaining <= 14
                        ? "default"
                        : "secondary"
                    }
                  >
                    {case_.daysRemaining <= 7
                      ? "Critical"
                      : case_.daysRemaining <= 14
                      ? "Warning"
                      : "Upcoming"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}