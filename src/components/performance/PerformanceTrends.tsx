import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", tasks: 45, cases: 12 },
  { month: "Feb", tasks: 52, cases: 15 },
  { month: "Mar", tasks: 48, cases: 13 },
  { month: "Apr", tasks: 61, cases: 18 },
  { month: "May", tasks: 55, cases: 16 },
  { month: "Jun", tasks: 67, cases: 20 },
]

export function PerformanceTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                stroke="hsl(var(--primary))" 
                name="Tasks Completed"
              />
              <Line 
                type="monotone" 
                dataKey="cases" 
                stroke="hsl(var(--secondary))" 
                name="Cases Closed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}