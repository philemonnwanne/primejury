import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Scale, Timer, TrendingUp, Users, Award, Star } from "lucide-react"

const metrics = [
  {
    title: "Total Cases",
    value: "190",
    description: "+12% from last month",
    icon: Scale,
  },
  {
    title: "Success Rate",
    value: "84%",
    description: "+3% from last month",
    icon: Award,
  },
  {
    title: "Avg. Resolution Time",
    value: "42 days",
    description: "-5 days from average",
    icon: Timer,
  },
  {
    title: "Client Satisfaction",
    value: "4.8/5",
    description: "Based on 156 reviews",
    icon: Star,
  },
  {
    title: "Active Lawyers",
    value: "15",
    description: "12 cases per lawyer",
    icon: Users,
  },
  {
    title: "Revenue Growth",
    value: "+22%",
    description: "Compared to last quarter",
    icon: TrendingUp,
  },
]

export function AnalyticsMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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