import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AddCaseDialog } from "@/components/cases/AddCaseDialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const cases = [
  {
    id: "1",
    title: "Property Dispute Resolution",
    status: "active",
    progress: 50,
    stage: "Discovery Phase",
    timeline: [
      "Case Filed",
      "Initial Hearing",
      "Discovery Phase",
      "Mediation",
      "Trial Preparation",
      "Trial",
      "Resolution"
    ]
  },
  {
    id: "2",
    title: "Contract Review",
    status: "active",
    progress: 25,
    stage: "Initial Hearing",
    timeline: [
      "Case Filed",
      "Initial Hearing",
      "Document Review",
      "Negotiation",
      "Resolution"
    ]
  },
  {
    id: "3",
    title: "Insurance Claim",
    status: "completed",
    progress: 100,
    stage: "Resolved",
    timeline: [
      "Claim Filed",
      "Investigation",
      "Settlement Negotiation",
      "Resolution"
    ]
  }
]

const statusColors = {
  active: "text-green-600 bg-green-50",
  completed: "text-blue-600 bg-blue-50",
}

export default function ClientCases() {
  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">My Cases</h1>
          <AddCaseDialog />
        </div>

        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Case Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="property">Property</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {cases.map((case_) => (
            <Card key={case_.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">{case_.title}</CardTitle>
                <span
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    statusColors[case_.status as keyof typeof statusColors]
                  }`}
                >
                  {case_.status}
                </span>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{case_.stage}</span>
                    <span>{case_.progress}%</span>
                  </div>
                  <Progress value={case_.progress} />
                  <div className="text-sm text-muted-foreground">
                    Stage {case_.timeline.findIndex(stage => stage === case_.stage) + 1} of {case_.timeline.length}
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/client-dashboard/insights?caseId=${case_.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ClientDashboardLayout>
  )
}
