import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Clock, AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function BillingOverview() {
  const navigate = useNavigate()

  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "+20.1% from last month",
      icon: DollarSign,
      route: "/lawyer-dashboard/billing/revenue"
    },
    {
      title: "Active Cases",
      value: "24",
      description: "+2 new this month",
      icon: Users,
      route: "/lawyer-dashboard/case-insights"
    },
    {
      title: "Pending Payments",
      value: "$12,450",
      description: "Due within 30 days",
      icon: Clock,
      route: "/lawyer-dashboard/billing?tab=requests"
    },
    {
      title: "Overdue Payments",
      value: "$4,320",
      description: "From 3 cases",
      icon: AlertTriangle,
      route: "/lawyer-dashboard/billing?tab=cases"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card 
            key={index}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate(metric.route)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}