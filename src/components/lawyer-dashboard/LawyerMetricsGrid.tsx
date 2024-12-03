import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, CheckSquare, Clock, Scale } from "lucide-react"

const metrics = [
  {
    title: "My Active Cases",
    value: "8",
    description: "+1 from last week",
    icon: Briefcase,
  },
  {
    title: "Pending Tasks",
    value: "5",
    description: "2 high priority",
    icon: CheckSquare,
  },
  {
    title: "Next Hearing",
    value: "2d 4h",
    description: "Smith vs. Johnson",
    icon: Clock,
  },
  {
    title: "Success Rate",
    value: "92%",
    description: "+5% this quarter",
    icon: Scale,
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
            <p className="text-xs text-muted-foreground">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}