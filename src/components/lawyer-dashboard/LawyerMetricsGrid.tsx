import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

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
    action: "pending-bids",
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
  const navigate = useNavigate();

  const handleMetricClick = (metric: typeof metrics[0]) => {
    if ('action' in metric && metric.action === 'pending-bids') {
      navigate('/lawyer-dashboard/marketplace');
      // Use setTimeout to ensure navigation completes before dispatching the event
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('show-pending-bids'));
      }, 100);
    } else if ('link' in metric) {
      navigate(metric.link);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="cursor-pointer"
          onClick={() => handleMetricClick(metric)}
        >
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
        </div>
      ))}
    </div>
  )
}