import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone } from "lucide-react"
import { lawyerProfiles } from "@/data/lawyerProfiles"
import { Link } from "react-router-dom"
import { DashboardLayout } from "@/layouts/DashboardLayout"

export default function LawyerProfiles() {
  return (
    <DashboardLayout>
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Our Lawyers</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lawyerProfiles.map((lawyer) => (
            <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{lawyer.name}</span>
                  <Badge variant="secondary">{lawyer.title}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{lawyer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{lawyer.phone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.specialization.map((spec) => (
                      <Badge key={spec} variant="outline">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <Badge variant="secondary">Success Rate: {lawyer.successRate}%</Badge>
                  <Link to={`/lawyers/${lawyer.id}`} className="text-sm text-blue-600 hover:underline">
                    View Full Profile
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}