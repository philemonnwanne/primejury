import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface MarketplaceCaseListProps {
  totalCases: number;
}

export function MarketplaceCaseList({ totalCases }: MarketplaceCaseListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketplace Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total Cases: {totalCases}</p>
        <Button variant="outline" asChild>
          <Link to="/marketplace/cases">View All Cases</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
