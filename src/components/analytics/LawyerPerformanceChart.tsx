import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Sarah P.", cases: 25, success: 22 },
  { name: "John D.", cases: 20, success: 16 },
  { name: "Emma R.", cases: 18, success: 15 },
  { name: "Michael B.", cases: 15, success: 12 },
]

export function LawyerPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lawyer Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#4f46e5" name="Total Cases" />
              <Bar dataKey="success" fill="#10b981" name="Successful Cases" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}