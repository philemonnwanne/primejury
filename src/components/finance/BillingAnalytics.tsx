import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"

const paymentMethodData = [
  { name: "Credit Card", value: 45 },
  { name: "Bank Transfer", value: 30 },
  { name: "Check", value: 15 },
  { name: "Other", value: 10 },
]

const monthlyRevenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 34000 },
  { month: "Mar", revenue: 48000, expenses: 31000 },
  { month: "Apr", revenue: 61000, expenses: 35000 },
  { month: "May", revenue: 55000, expenses: 33000 },
  { month: "Jun", revenue: 67000, expenses: 38000 },
]

const billingStatusData = [
  { status: "Paid", amount: 125000 },
  { status: "Pending", amount: 45000 },
  { status: "Overdue", amount: 15000 },
  { status: "Disputed", amount: 5000 },
]

const COLORS = ["#7EBF8E", "#D2886F", "#6B7280", "#9CA3AF"]

export function BillingAnalytics() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#7EBF8E" 
                  strokeWidth={2}
                  dot={{ fill: "#7EBF8E" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#D2886F" 
                  strokeWidth={2}
                  dot={{ fill: "#D2886F" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Billing Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={billingStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="amount" 
                  fill="#7EBF8E"
                  name="Amount ($)"
                  label={{ position: 'top' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}