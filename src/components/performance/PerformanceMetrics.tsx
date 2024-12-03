import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Award, Clock, TrendingUp, CheckCircle } from "lucide-react"

const metrics = [
  {
    title: "Total Cases Resolved",
    value: "145",
    description: "+12% from last month",
    icon: CheckCircle,
  },
  {
    title: "Success Rate",
    value: "89%",
    description: "+4% from average",
    icon: Award,
  },
  {
    title: "Avg. Resolution Time",
    value: "42 days",
    description: "5 days faster than avg",
    icon: Clock,
  },
  {
    title: "Current Month Activity",
    value: "24",
    description: "tasks completed",
    icon: TrendingUp,
  },
]

export function PerformanceMetrics() {
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