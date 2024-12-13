import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Won", value: 45, color: "#10b981" },
  { name: "Lost", value: 15, color: "#ef4444" },
  { name: "Settled", value: 30, color: "#3b82f6" },
  { name: "Pending", value: 25, color: "#f59e0b" },
  { name: "Dismissed", value: 5, color: "#6b7280" },
]

export function CaseDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Outcomes Distribution</CardTitle>
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
              <Tooltip 
                formatter={(value) => [`${value} cases`, 'Count']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}