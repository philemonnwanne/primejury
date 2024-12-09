import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Won", value: 45, color: "#10b981" },
  { name: "Settled", value: 30, color: "#6366f1" },
  { name: "Lost", value: 15, color: "#ef4444" },
  { name: "Pending", value: 10, color: "#f59e0b" },
]

export function PerformanceMetrics() {
  return (
    <Card className="col-span-full md:col-span-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}