import {
  Table,
  TableBody,
} from "@/components/ui/table"
import { CaseTableHeader } from "./CaseTableHeader"
import { CaseTableRow } from "./CaseTableRow"
import { mockCases } from "./mock-data/cases"

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
        <CaseTableHeader />
        <TableBody>
          {filteredCases.map((case_) => (
            <CaseTableRow
              key={case_.id}
              case_={case_}
              onClick={() => onCaseSelect(case_.id)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}