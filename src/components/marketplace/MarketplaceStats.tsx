import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MarketplaceStatsProps {
  totalCases: number;
}

export function MarketplaceStats({ totalCases }: MarketplaceStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium">Total Available Cases</h3>
        <p className="text-2xl font-bold">{totalCases}</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium">Total Bids Placed</h3>
        <p className="text-2xl font-bold">0</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium">Total Pro Bono Cases</h3>
        <p className="text-2xl font-bold">0</p>
      </div>
    </div>
  )
}
