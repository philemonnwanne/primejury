import { database, clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function MarketplaceStats({ totalCases }: { totalCases: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Available Cases</p>
            <p className="text-2xl font-bold">{totalCases}</p>
          </div>
          <database className="h-4 w-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </div>
  )
}