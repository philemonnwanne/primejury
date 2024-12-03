import { DashboardLayout } from "@/layouts/DashboardLayout"
import { StaffDirectory } from "@/components/staff/StaffDirectory"
import { StaffActions } from "@/components/staff/StaffActions"

export default function Staff() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <StaffActions />
        </div>
        <StaffDirectory />
      </div>
    </DashboardLayout>
  )
}