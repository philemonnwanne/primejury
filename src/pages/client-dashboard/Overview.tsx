import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Briefcase, FileText, Folder, BarChart2, Newspaper, 
  MessageSquare, CreditCard, AlertTriangle, Clock 
} from "lucide-react"
import { Link } from "react-router-dom"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data - in a real app, this would come from your backend
const caseActivityData = [
  { month: "Jan", cases: 4 },
  { month: "Feb", cases: 3 },
  { month: "Mar", cases: 5 },
  { month: "Apr", cases: 2 },
]

const documentDistribution = [
  { name: "Legal Forms", value: 30, color: "#4f46e5" },
  { name: "Case Documents", value: 45, color: "#10b981" },
  { name: "Communications", value: 25, color: "#f59e0b" },
]

const billingOverview = [
  { month: "Jan", amount: 2500 },
  { month: "Feb", amount: 3200 },
  { month: "Mar", amount: 2800 },
  { month: "Apr", amount: 3500 },
]

const metrics = [
  {
    title: "Active Cases",
    value: "3",
    description: "2 in progress, 1 pending review",
    icon: Briefcase,
    link: "/client-dashboard/cases",
  },
  {
    title: "Pending Forms",
    value: "5",
    description: "3 require immediate attention",
    icon: FileText,
    link: "/client-dashboard/forms",
  },
  {
    title: "Recent Documents",
    value: "12",
    description: "4 new this week",
    icon: Folder,
    link: "/client-dashboard/documents",
  },
  {
    title: "Case Updates",
    value: "8",
    description: "Last updated 2h ago",
    icon: BarChart2,
    link: "/client-dashboard/insights",
  },
]

const recentUpdates = [
  {
    type: "case",
    title: "Smith vs. Johnson",
    description: "New document added",
    timestamp: "2h ago",
    priority: "high",
  },
  {
    type: "form",
    title: "Property Dispute Form",
    description: "Requires your attention",
    timestamp: "4h ago",
    priority: "medium",
  },
  {
    type: "billing",
    title: "Invoice #INV001",
    description: "Payment processed",
    timestamp: "1d ago",
    priority: "low",
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

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
                <Button
                  variant="link"
                  className="px-0 mt-2"
                  asChild
                >
                  <Link to={metric.link}>View Details →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Case Activity Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Case Activity</CardTitle>
              <CardDescription>Monthly case distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={caseActivityData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cases" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Document Distribution */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Document Distribution</CardTitle>
              <CardDescription>By category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={documentDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {documentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest activity across your cases</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {recentUpdates.map((update, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{update.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {update.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              update.priority === "high"
                                ? "destructive"
                                : update.priority === "medium"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {update.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {update.timestamp}
                          </span>
                        </div>
                      </div>
                      {update.priority === "high" && (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Billing Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Overview</CardTitle>
              <CardDescription>Monthly billing trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={billingOverview}>
                    <XAxis dataKey="month" />
                    <YAxis 
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, "Amount"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#4f46e5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientDashboardLayout>
  )
}