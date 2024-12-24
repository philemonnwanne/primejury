import { useState } from "react"
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
import { StaffMemberDetails } from "./StaffMemberDetails"
import { staffMembers } from "./mock-data"

export function StaffDirectory() {
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null)

  const selectedMember = staffMembers.find(staff => staff.id === selectedStaff)

  return (
    <div className="space-y-6">
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
            <SelectItem value="legal_assistant">Legal Assistant</SelectItem>
            <SelectItem value="case_manager">Case Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
                <TableRow 
                  key={staff.id}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedStaff(staff.id)}
                >
                  <TableCell className="font-medium">
                    {staff.name}
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

        <div className="border rounded-lg p-6">
          {selectedMember ? (
            <StaffMemberDetails staffMember={selectedMember} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a staff member to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}