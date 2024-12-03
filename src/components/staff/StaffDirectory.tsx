import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const staffMembers = [
  {
    id: 1,
    name: "Sarah Palmer",
    role: "Lawyer",
    email: "sarah.palmer@example.com",
    phone: "(555) 123-4567",
    activeCases: 5,
    completedCases: 12,
    pendingTasks: 3,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Paralegal",
    email: "michael.chen@example.com",
    phone: "(555) 234-5678",
    activeCases: 3,
    completedCases: 8,
    pendingTasks: 2,
  },
]

export function StaffDirectory() {
  const [roleFilter, setRoleFilter] = useState<string>("all")

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search staff members..."
          className="max-w-sm"
        />
        <Select
          value={roleFilter}
          onValueChange={setRoleFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="lawyer">Lawyer</SelectItem>
            <SelectItem value="paralegal">Paralegal</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Workload</TableHead>
              <TableHead>Tasks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>
                  <Link
                    to={`/dashboard/staff/${staff.id}`}
                    className="font-medium hover:underline"
                  >
                    {staff.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{staff.role}</Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{staff.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {staff.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">
                      Active Cases: {staff.activeCases}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed: {staff.completedCases}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{staff.pendingTasks} pending</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}