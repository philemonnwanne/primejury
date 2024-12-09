import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Clock, AlertTriangle, CheckCircle } from "lucide-react"

const metrics = [
  {
    title: "Active Cases",
    value: "12",
    description: "4 high priority",
    icon: Briefcase,
  },
  {
    title: "Pending Cases",
    value: "8",
    description: "2 awaiting response",
    icon: Clock,
  },
  {
    title: "Urgent Tasks",
    value: "5",
    description: "Due this week",
    icon: AlertTriangle,
  },
  {
    title: "Closed Cases",
    value: "45",
    description: "This year",
    icon: CheckCircle,
  },
]

export function LawyerMetricsGrid() {
  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title} className="glass-effect transition-all duration-300 hover:shadow-lg">
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
    </>
  )
}