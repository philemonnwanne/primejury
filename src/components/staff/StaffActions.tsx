import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export function StaffActions() {
  return (
    <div className="flex items-center gap-4">
      <Button>
        <UserPlus className="mr-2 h-4 w-4" />
        Add Staff Member
      </Button>
    </div>
  )
}