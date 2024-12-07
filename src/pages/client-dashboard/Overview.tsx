import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, CheckSquare, Calendar } from "lucide-react"

const metrics = [
  {
    title: "Total Active Cases",
    value: "3",
    icon: Briefcase,
    link: "/client-dashboard/cases",
  },
  {
    title: "Pending Tasks",
    value: "5",
    icon: CheckSquare,
    link: "/client-dashboard/cases",
  },
  {
    title: "Upcoming Deadlines",
    value: "2",
    icon: Calendar,
    link: "/client-dashboard/cases",
  },
]

export default function ClientDashboard() {
  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">
            Here's an overview of your legal matters
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <Button
                  variant="link"
                  className="px-0"
                  asChild
                >
                  <a href={metric.link}>View Details →</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ClientDashboardLayout>
  )
}