import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CaseBidsList() {
  const activeCases = [
    {
      id: 1,
      title: "Contract Dispute Resolution",
      type: "Civil Litigation",
      description: "Seeking legal representation for a contract dispute with a former business partner.",
      budget: "$5,000 - $10,000",
      bidsCount: 3,
      status: "Active",
      postedDate: "2024-03-10",
    },
    // Add more mock cases as needed
  ]

  return (
    <div className="space-y-4">
      {activeCases.map((caseItem) => (
        <Card key={caseItem.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{caseItem.title}</CardTitle>
              <Badge>{caseItem.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Case Type</p>
                  <p>{caseItem.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget Range</p>
                  <p>{caseItem.budget}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Posted Date</p>
                  <p>{new Date(caseItem.postedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bids Received</p>
                  <p>{caseItem.bidsCount}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="mt-1">{caseItem.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}