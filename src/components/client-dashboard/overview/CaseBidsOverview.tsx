import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gavel } from "lucide-react"
import { Link } from "react-router-dom"

interface BidSummary {
  id: string
  caseTitle: string
  bidCount: number
  status: "active" | "pending" | "completed"
  lastBidDate: string
}

const mockBidSummaries: BidSummary[] = [
  {
    id: "1",
    caseTitle: "Contract Dispute Resolution",
    bidCount: 3,
    status: "active",
    lastBidDate: "2024-03-14",
  },
  {
    id: "2",
    caseTitle: "Property Settlement Case",
    bidCount: 2,
    status: "pending",
    lastBidDate: "2024-03-13",
  },
]

export function CaseBidsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gavel className="h-5 w-5" />
          Case Bids Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockBidSummaries.map((bid) => (
          <div
            key={bid.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-1">
              <h4 className="font-medium">{bid.caseTitle}</h4>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {bid.bidCount} {bid.bidCount === 1 ? 'bid' : 'bids'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Last bid: {new Date(bid.lastBidDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/client-dashboard/case-bids">View Details</Link>
            </Button>
          </div>
        ))}
        <Button className="w-full" asChild>
          <Link to="/client-dashboard/case-bids">View All Case Bids</Link>
        </Button>
      </CardContent>
    </Card>
  )
}