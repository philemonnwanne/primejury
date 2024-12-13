import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

const metrics = [
  {
    title: "Active Cases",
    value: "12",
    description: "4 high priority",
    icon: Briefcase,
    link: "/lawyer-dashboard/case-insights",
  },
  {
    title: "Pending Cases",
    value: "8",
    description: "2 awaiting response",
    icon: Clock,
    link: "/lawyer-dashboard/marketplace",
  },
  {
    title: "Urgent Tasks",
    value: "5",
    description: "Due this week",
    icon: AlertTriangle,
    link: "/lawyer-dashboard/tasks",
  },
  {
    title: "Closed Cases",
    value: "45",
    description: "This year",
    icon: CheckCircle,
    link: "/lawyer-dashboard/case-insights?tab=past",
  },
]

export function LawyerMetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Link key={metric.title} to={metric.link} className="block">
          <Card className="transition-shadow hover:shadow-md">
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
        </Link>
      ))}
    </div>
  )
}