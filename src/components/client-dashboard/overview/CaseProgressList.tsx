import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface CaseProgress {
  id: string
  title: string
  progress: number
  status: "active" | "pending" | "completed"
  lastUpdate: string
}

const mockCases: CaseProgress[] = [
  {
    id: "1",
    title: "Smith vs. Johnson",
    progress: 75,
    status: "active",
    lastUpdate: "2024-03-18",
  },
  {
    id: "2",
    title: "Property Dispute",
    progress: 45,
    status: "active",
    lastUpdate: "2024-03-17",
  },
  {
    id: "3",
    title: "Insurance Claim",
    progress: 90,
    status: "active",
    lastUpdate: "2024-03-15",
  },
]

export function CaseProgressList() {
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-blue-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Cases Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockCases.map((caseItem) => (
          <div key={caseItem.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{caseItem.title}</h4>
              <span className="text-sm text-muted-foreground">
                {caseItem.progress}%
              </span>
            </div>
            <Progress
              value={caseItem.progress}
              className={`h-2 ${getProgressColor(caseItem.progress)}`}
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Last updated: {new Date(caseItem.lastUpdate).toLocaleDateString()}
              </span>
              <Button variant="link" size="sm" asChild>
                <Link to={`/client-dashboard/cases/${caseItem.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}