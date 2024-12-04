import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const timeline = [
  {
    title: "Form Submitted",
    date: "Jan 15, 2024",
    status: "completed",
  },
  {
    title: "Initial Review",
    date: "Jan 20, 2024",
    status: "completed",
  },
  {
    title: "Hearing Scheduled",
    date: "Feb 15, 2024",
    status: "current",
  },
  {
    title: "Final Decision",
    date: "Mar 1, 2024",
    status: "pending",
  },
]

const similarCases = [
  {
    title: "Property Boundary Dispute",
    outcome: "Resolved in favor of client",
    duration: "4 months",
    success: true,
  },
  {
    title: "Contract Breach Case",
    outcome: "Settled out of court",
    duration: "3 months",
    success: true,
  },
]

export default function ClientInsights() {
  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Insights</h1>
          <p className="text-muted-foreground">
            Track your case progress and view similar cases
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Case Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-6">
                {timeline.map((event, index) => (
                  <div key={event.title} className="relative pl-8">
                    <div
                      className={`absolute left-3.5 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
                        event.status === "completed"
                          ? "bg-primary border-primary"
                          : event.status === "current"
                          ? "bg-white border-primary"
                          : "bg-white border-muted"
                      }`}
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date}
                        </p>
                      </div>
                      {event.status === "current" && (
                        <span className="text-sm text-primary font-medium">
                          Current Stage
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Similar Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {similarCases.map((case_) => (
              <div
                key={case_.title}
                className="p-4 border rounded-lg space-y-2"
              >
                <h4 className="font-medium">{case_.title}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    Duration: {case_.duration}
                  </p>
                  <p
                    className={
                      case_.success ? "text-green-600" : "text-yellow-600"
                    }
                  >
                    Outcome: {case_.outcome}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" className="w-full md:w-auto">
            Consult a Lawyer
          </Button>
        </div>
      </div>
    </ClientDashboardLayout>
  )
}