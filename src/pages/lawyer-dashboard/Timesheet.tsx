import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockCases } from "@/components/cases/mock-data/cases"
import { formatTime } from "@/components/lawyer-dashboard/timer/utils"

interface TimeEntry {
  id: string
  caseId: string
  description: string
  duration: number
  date: string
  status: "invoiced" | "unbilled"
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: "1",
    caseId: "case_1",
    description: "Initial case review",
    duration: 3600,
    date: "2024-03-15",
    status: "unbilled"
  },
  {
    id: "2",
    caseId: "case_2",
    description: "Client meeting",
    duration: 1800,
    date: "2024-03-15",
    status: "invoiced"
  }
]

export default function Timesheet() {
  const [timeEntries] = useState<TimeEntry[]>(mockTimeEntries)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "invoiced" | "unbilled">("all")

  const filteredEntries = timeEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mockCases.find(c => c.id === entry.caseId)?.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalHours = filteredEntries.reduce((acc, entry) => acc + entry.duration, 0)

  const handleExport = (format: "csv" | "pdf") => {
    // In a real app, this would trigger the export functionality
    console.log(`Exporting timesheet as ${format}`)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Timesheet</h1>
        <div className="space-x-2">
          <Button onClick={() => handleExport("csv")}>Export CSV</Button>
          <Button onClick={() => handleExport("pdf")}>Export PDF</Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search cases or descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={(value: "all" | "invoiced" | "unbilled") => setStatusFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Entries</SelectItem>
            <SelectItem value="invoiced">Invoiced</SelectItem>
            <SelectItem value="unbilled">Unbilled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <div className="p-4 bg-muted/50">
          <h2 className="font-semibold">Summary</h2>
          <p className="text-sm text-muted-foreground">
            Total Hours: {formatTime(totalHours)}
          </p>
        </div>
        <div className="divide-y">
          {filteredEntries.map(entry => (
            <div key={entry.id} className="p-4 hover:bg-accent/50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    {mockCases.find(c => c.id === entry.caseId)?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono">{formatTime(entry.duration)}</p>
                  <span className={`text-xs ${
                    entry.status === "invoiced" ? "text-green-600" : "text-orange-600"
                  }`}>
                    {entry.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}