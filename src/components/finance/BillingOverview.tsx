import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Clock, AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function BillingOverview() {
  const navigate = useNavigate()

  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "+20.1% from last month",
      icon: DollarSign,
      route: "/lawyer-dashboard/billing?tab=reports",
      details: "View detailed revenue breakdown"
    },
    {
      title: "Active Cases",
      value: "24",
      description: "+2 new this month",
      icon: Users,
      route: "/lawyer-dashboard/billing?tab=cases",
      details: "View all active case billings"
    },
    {
      title: "Pending Payments",
      value: "$12,450",
      description: "Due within 30 days",
      icon: Clock,
      route: "/lawyer-dashboard/billing?tab=requests",
      details: "Manage pending payment requests"
    },
    {
      title: "Overdue Payments",
      value: "$4,320",
      description: "From 3 cases",
      icon: AlertTriangle,
      route: "/lawyer-dashboard/billing?tab=cases",
      details: "Handle overdue payments"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Button
            key={index}
            variant="ghost"
            className="h-auto p-0 hover:bg-transparent"
            onClick={() => navigate(metric.route)}
          >
            <Card className="w-full cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
                <p className="text-xs text-primary mt-2 hover:underline">{metric.details}</p>
              </CardContent>
            </Card>
          </Button>
        )
      })}
    </div>
  )
}