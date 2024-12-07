import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, FileText, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"

interface CaseOverviewPanelProps {
  cases: Array<{
    id: string
    title: string
    status: string
    progress: number
    nextDeadline?: string
    lawyer: {
      name: string
      imageUrl: string
    }
    recentActivities: Array<{
      id: string
      action: string
      date: string
    }>
  }>
}

export function CaseOverviewPanel({ cases }: CaseOverviewPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cases.map((case_) => (
        <Card key={case_.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-lg font-bold">{case_.title}</CardTitle>
              <Badge 
                variant={case_.status === "active" ? "default" : 
                        case_.status === "pending" ? "secondary" : "outline"}
                className="mt-2"
              >
                {case_.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={case_.lawyer.imageUrl}
                alt={case_.lawyer.name}
                className="h-8 w-8 rounded-full"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{case_.progress}%</span>
              </div>
              <Progress value={case_.progress} />
            </div>
            
            {case_.nextDeadline && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>Next Deadline: {case_.nextDeadline}</span>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recent Activities</h4>
              <div className="space-y-2">
                {case_.recentActivities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="text-sm text-muted-foreground">
                    {activity.action}
                    <span className="block text-xs">{activity.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/client-dashboard/documents?caseId=${case_.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/client-dashboard/communications?caseId=${case_.id}`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}