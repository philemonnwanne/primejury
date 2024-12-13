import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Sarah P.", cases: 45, success: 38 },
  { name: "John D.", cases: 35, success: 28 },
  { name: "Emma R.", cases: 42, success: 35 },
  { name: "Michael B.", cases: 38, success: 30 },
  { name: "Lisa K.", cases: 32, success: 25 },
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