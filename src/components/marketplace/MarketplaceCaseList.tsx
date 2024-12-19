import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface MarketplaceCaseListProps {
  totalCases?: number
}

export function MarketplaceCaseList({ totalCases = 0 }: MarketplaceCaseListProps) {
  const { toast } = useToast()

  const handleViewDetails = (caseId: string) => {
    toast({
      title: "View Case Details",
      description: `Viewing details for case ID: ${caseId}`,
    })
  }

  const mockCases = [
    {
      id: "1",
      title: "Smith vs. Johnson",
      type: "Civil Litigation",
      status: "active",
      progress: 75,
    },
    {
      id: "2",
      title: "Doe vs. State",
      type: "Criminal Defense",
      status: "completed",
      progress: 100,
    },
    {
      id: "3",
      title: "Brown vs. Brown",
      type: "Family Law",
      status: "pending",
      progress: 50,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketplace Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCases.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell className="font-medium">{case_.title}</TableCell>
                <TableCell>{case_.type}</TableCell>
                <TableCell>{case_.status}</TableCell>
                <TableCell>{case_.progress}%</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => handleViewDetails(case_.id)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
