import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { category: "Criminal", avgDays: 45 },
  { category: "Civil", avgDays: 60 },
  { category: "Corporate", avgDays: 30 },
  { category: "Family", avgDays: 50 },
  { category: "Real Estate", avgDays: 40 },
]

export function CaseResolutionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Resolution Time by Case Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar 
                dataKey="avgDays" 
                fill="hsl(var(--primary))" 
                name="Average Days"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}