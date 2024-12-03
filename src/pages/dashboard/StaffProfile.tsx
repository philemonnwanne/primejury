import { useParams } from "react-router-dom"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StaffProfile() {
  const { id } = useParams()
  
  // Mock data - in a real app, this would be fetched based on the ID
  const staff = {
    id: 1,
    name: "Sarah Palmer",
    role: "Lawyer",
    email: "sarah.palmer@example.com",
    phone: "(555) 123-4567",
    activeCases: 5,
    completedCases: 12,
    pendingTasks: 3,
    performance: {
      casesResolved: 45,
      avgTaskCompletion: "2.5 days",
    },
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{staff.name}</h1>
          <Badge variant="outline">{staff.role}</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Email: {staff.email}</p>
              <p className="text-sm">Phone: {staff.phone}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Workload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Active Cases: {staff.activeCases}</p>
              <p className="text-sm">Pending Tasks: {staff.pendingTasks}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Overall performance statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                Cases Resolved: {staff.performance.casesResolved}
              </p>
              <p className="text-sm">
                Avg. Task Completion: {staff.performance.avgTaskCompletion}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}