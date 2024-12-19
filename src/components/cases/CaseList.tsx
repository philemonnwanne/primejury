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
  createdAt: string
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
    status: "active",
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
    lawyer: "David Martinez",
    status: "active",
    priority: "high",
    createdAt: "2024-03-01",
  },
  {
    id: "5",
    title: "Green Energy Acquisition",
    type: "Corporate",
    client: "EcoTech Solutions",
    lawyer: "Lisa Wong",
    status: "active",
    priority: "medium",
    createdAt: "2024-02-15",
  },
  {
    id: "6",
    title: "Thompson Family Trust",
    type: "Estate",
    client: "Mary Thompson",
    lawyer: "James Wilson",
    status: "closed",
    priority: "medium",
    createdAt: "2023-10-12",
  },
  {
    id: "7",
    title: "Healthcare Compliance Review",
    type: "Regulatory",
    client: "MedCare Inc",
    lawyer: "Patricia Chen",
    status: "active",
    priority: "high",
    createdAt: "2024-01-30",
  },
  {
    id: "8",
    title: "Construction Dispute",
    type: "Civil Litigation",
    client: "BuildRight LLC",
    lawyer: "Robert Taylor",
    status: "closed",
    priority: "medium",
    createdAt: "2023-09-15",
  },
  {
    id: "9",
    title: "Intellectual Property Claim",
    type: "IP Law",
    client: "Innovation Tech",
    lawyer: "Michelle Lee",
    status: "active",
    priority: "high",
    createdAt: "2024-02-28",
  },
  {
    id: "10",
    title: "Employment Contract Review",
    type: "Employment",
    client: "Global Corp",
    lawyer: "Daniel Brown",
    status: "closed",
    priority: "low",
    createdAt: "2023-12-05",
  },
  {
    id: "11",
    title: "Real Estate Development",
    type: "Real Estate",
    client: "Urban Developers",
    lawyer: "Rachel Green",
    status: "active",
    priority: "medium",
    createdAt: "2024-01-20",
  },
  {
    id: "12",
    title: "Environmental Compliance",
    type: "Environmental",
    client: "Clean Industries",
    lawyer: "Thomas Anderson",
    status: "closed",
    priority: "high",
    createdAt: "2023-11-15",
  },
  {
    id: "13",
    title: "Patent Application",
    type: "IP Law",
    client: "TechStart Inc",
    lawyer: "Jennifer Wu",
    status: "active",
    priority: "medium",
    createdAt: "2024-02-10",
  },
  {
    id: "14",
    title: "Corporate Restructuring",
    type: "Corporate",
    client: "Legacy Corp",
    lawyer: "Mark Stevens",
    status: "closed",
    priority: "high",
    createdAt: "2023-10-30",
  },
  {
    id: "15",
    title: "Maritime Insurance Claim",
    type: "Maritime Law",
    client: "Ocean Shipping Co",
    lawyer: "Christopher Lee",
    status: "active",
    priority: "high",
    createdAt: "2024-03-05",
  },
  {
    id: "16",
    title: "Family Trust Dissolution",
    type: "Estate",
    client: "Williams Family",
    lawyer: "Sarah Johnson",
    status: "closed",
    priority: "medium",
    createdAt: "2023-09-28",
  }
]

const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
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