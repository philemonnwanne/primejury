import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"

const mockData = {
  monthly: [
    { date: "Jan", earnings: 45000, pending: 12000 },
    { date: "Feb", earnings: 52000, pending: 15000 },
    { date: "Mar", earnings: 48000, pending: 10000 },
    { date: "Apr", earnings: 61000, pending: 18000 },
    { date: "May", earnings: 55000, pending: 13000 },
    { date: "Jun", earnings: 67000, pending: 20000 },
  ],
  daily: [
    { date: "Mon", earnings: 9500, pending: 2500 },
    { date: "Tue", earnings: 8200, pending: 3000 },
    { date: "Wed", earnings: 11000, pending: 2800 },
    { date: "Thu", earnings: 9800, pending: 3200 },
    { date: "Fri", earnings: 12500, pending: 4000 },
  ],
}

export function RevenueChart() {
  const [timeRange, setTimeRange] = useState<"daily" | "monthly">("monthly")

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Revenue</CardTitle>
        <Select value={timeRange} onValueChange={(value: "daily" | "monthly") => setTimeRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="hsl(var(--primary))"
                name="Total Earnings"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="hsl(var(--destructive))"
                name="Pending Payments"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}