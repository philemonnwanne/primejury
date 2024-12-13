import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", revenue: 145000 },
  { month: "Feb", revenue: 162000 },
  { month: "Mar", revenue: 158000 },
  { month: "Apr", revenue: 171000 },
  { month: "May", revenue: 165000 },
  { month: "Jun", revenue: 177000 },
  { month: "Jul", revenue: 182000 },
  { month: "Aug", revenue: 191000 },
  { month: "Sep", revenue: 188000 },
  { month: "Oct", revenue: 197000 },
  { month: "Nov", revenue: 192000 },
  { month: "Dec", revenue: 205000 },
]

export function RevenueAnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}