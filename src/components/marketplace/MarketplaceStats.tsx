import { Database, Clock, Users, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Revenue",
    value: "$1,200,000",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "1,500",
    icon: Users,
  },
  {
    title: "Pending Orders",
    value: "75",
    icon: Clock,
  },
  {
    title: "Database Size",
    value: "500 GB",
    icon: Database,
  },
]

export function MarketplaceStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
