import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const activityData = [
  {
    week: "Week 1",
    tasksCompleted: 12,
    documentsUploaded: 8,
    casesClosed: 3,
  },
  {
    week: "Week 2",
    tasksCompleted: 15,
    documentsUploaded: 10,
    casesClosed: 2,
  },
  {
    week: "Week 3",
    tasksCompleted: 8,
    documentsUploaded: 6,
    casesClosed: 4,
  },
  {
    week: "Week 4",
    tasksCompleted: 14,
    documentsUploaded: 12,
    casesClosed: 3,
  },
]

export function ActivitySummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Activity Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Tasks Completed</TableHead>
              <TableHead>Documents Uploaded</TableHead>
              <TableHead>Cases Closed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityData.map((row) => (
              <TableRow key={row.week}>
                <TableCell>{row.week}</TableCell>
                <TableCell>{row.tasksCompleted}</TableCell>
                <TableCell>{row.documentsUploaded}</TableCell>
                <TableCell>{row.casesClosed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}