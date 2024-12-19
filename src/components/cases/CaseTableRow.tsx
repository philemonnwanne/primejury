import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Case, priorityColors } from "./types"

interface CaseTableRowProps {
  case_: Case
  onClick: () => void
}

export function CaseTableRow({ case_, onClick }: CaseTableRowProps) {
  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50"
      onClick={onClick}
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
  )
}