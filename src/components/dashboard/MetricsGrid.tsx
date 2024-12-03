import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, CheckSquare, Clock, TrendingUp } from "lucide-react"

const metrics = [
  {
    title: "Total Active Cases",
    value: "24",
    description: "+2 from last month",
    icon: Briefcase,
  },
  {
    title: "Pending Tasks",
    value: "12",
    description: "-3 from last month",
    icon: CheckSquare,
  },
  {
    title: "Avg. Resolution Time",
    value: "45 days",
    description: "5 days faster than avg",
    icon: Clock,
  },
  {
    title: "Success Rate",
    value: "89%",
    description: "+4% from last month",
    icon: TrendingUp,
  },
]

export function MetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}