import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, CheckSquare, Clock, Scale, AlertOctagon, FileText } from "lucide-react"

const metrics = [
  {
    title: "Active Cases",
    value: "14",
    description: "8 high priority",
    icon: Briefcase,
    trend: "+2 this month",
  },
  {
    title: "Urgent Tasks",
    value: "5",
    description: "3 overdue",
    icon: AlertOctagon,
    trend: "-2 from last week",
  },
  {
    title: "Success Rate",
    value: "92%",
    description: "Last 30 cases",
    icon: Scale,
    trend: "+5% this quarter",
  },
  {
    title: "Pending Reviews",
    value: "7",
    description: "Documents waiting",
    icon: FileText,
    trend: "2 urgent",
  },
]

export function LawyerMetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
              <p className="text-xs font-medium text-primary">
                {metric.trend}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}