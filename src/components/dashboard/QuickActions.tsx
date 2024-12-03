import { Button } from "@/components/ui/button"
import { Plus, UserPlus, Upload } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex flex-col gap-4">
      <Button className="justify-start">
        <Plus className="mr-2 h-4 w-4" />
        Add New Case
      </Button>
      <Button className="justify-start" variant="secondary">
        <UserPlus className="mr-2 h-4 w-4" />
        Assign Lawyer
      </Button>
      <Button className="justify-start" variant="secondary">
        <Upload className="mr-2 h-4 w-4" />
        Upload Documents
      </Button>
    </div>
  )
}