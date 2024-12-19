import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function CaseTableHeader() {
  return (
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
  )
}