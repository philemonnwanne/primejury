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
  status: "active" | "pending" | "pending_review" | "closed"
  priority: "high" | "medium" | "low"
  createdAt: string // Added this field
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
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Tech Corp Merger",
    type: "Corporate",
    client: "Tech Corp",
    lawyer: "Michael Chang",
    status: "pending",
    priority: "medium",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    title: "Estate Planning - Brown",
    type: "Estate",
    client: "Robert Brown",
    lawyer: "Emily Wilson",
    status: "closed",
    priority: "low",
    createdAt: "2023-11-30",
  },
  {
    id: "4",
    title: "Personal Injury Case",
    type: "Civil",
    client: "Jane Doe",
    lawyer: "Pending Assignment",
    status: "pending_review",
    priority: "medium",
    createdAt: "2024-03-01",
  }
]

const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const

const statusColors = {
  active: "default",
  pending: "secondary",
  pending_review: "secondary",
  closed: "outline",
} as const

interface CaseListProps {
  onCaseSelect: (caseId: string) => void
  filter?: "active" | "inactive"
}

export function CaseList({ onCaseSelect, filter = "active" }: CaseListProps) {
  const filteredCases = mockCases.filter(case_ => {
    if (filter === "active") {
      return case_.status !== "closed";
    }
    return case_.status === "closed";
  });

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
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCases.map((case_) => (
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
                <Badge variant={statusColors[case_.status]}>
                  {case_.status === "pending" ? "Pending Acceptance" : 
                   case_.status === "pending_review" ? "Pending Lawyer Review" :
                   case_.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={priorityColors[case_.priority]}>
                  {case_.priority}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(case_.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}