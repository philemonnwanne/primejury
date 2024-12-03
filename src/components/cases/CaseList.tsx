import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Case {
  id: string
  title: string
  type: string
  client: string
  lawyer: string
  status: "active" | "pending" | "closed"
  priority: "high" | "medium" | "low"
}

const mockCases: Case[] = [
  {
    id: "1",
    title: "Smith vs. Johnson",
    type: "Civil Litigation",
    client: "John Smith",
    lawyer: "Sarah Parker",
    status: "active",
    priority: "high",
  },
  {
    id: "2",
    title: "Tech Corp Merger",
    type: "Corporate",
    client: "Tech Corp",
    lawyer: "Michael Chang",
    status: "pending",
    priority: "medium",
  },
  {
    id: "3",
    title: "Estate Planning - Brown",
    type: "Estate",
    client: "Robert Brown",
    lawyer: "Emily Wilson",
    status: "closed",
    priority: "low",
  },
]

const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const

const statusColors = {
  active: "default",
  pending: "secondary",
  closed: "outline",
} as const

interface CaseListProps {
  onCaseSelect: (caseId: string) => void
}

export function CaseList({ onCaseSelect }: CaseListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Assigned Lawyer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCases.map((case_) => (
            <TableRow
              key={case_.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onCaseSelect(case_.id)}
            >
              <TableCell className="font-medium">{case_.title}</TableCell>
              <TableCell>{case_.type}</TableCell>
              <TableCell>{case_.client}</TableCell>
              <TableCell>{case_.lawyer}</TableCell>
              <TableCell>
                <Badge variant={statusColors[case_.status]}>{case_.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={priorityColors[case_.priority]}>
                  {case_.priority}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}