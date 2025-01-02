import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, UserPlus, Users, FileText, Send } from "lucide-react"
import { AddCaseDialog } from "./AddCaseDialog"
import { IntakeFormDialog } from "./IntakeFormDialog"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function CaseActionsDropdown() {
  const [showAccessList, setShowAccessList] = useState(false)
  const [showAddCoCounsel, setShowAddCoCounsel] = useState(false)
  const { toast } = useToast()

  const handleAddCoCounsel = () => {
    // This would typically integrate with your backend
    toast({
      title: "Co-Counsel Added",
      description: "The co-counsel has been granted access to this case.",
    })
    setShowAddCoCounsel(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Actions
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <AddCaseDialog>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <FileText className="mr-2 h-4 w-4" />
              Create New Case
            </DropdownMenuItem>
          </AddCaseDialog>
          
          <IntakeFormDialog>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Send className="mr-2 h-4 w-4" />
              Send Intake Form
            </DropdownMenuItem>
          </IntakeFormDialog>

          <DropdownMenuItem onSelect={() => setShowAddCoCounsel(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Co-Counsel
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setShowAccessList(true)}>
            <Users className="mr-2 h-4 w-4" />
            Access List
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showAddCoCounsel} onOpenChange={setShowAddCoCounsel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Co-Counsel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter co-counsel's email"
              />
            </div>
            <Button onClick={handleAddCoCounsel}>Add Co-Counsel</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAccessList} onOpenChange={setShowAccessList}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Case Access List</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4">
                <h4 className="font-medium">Current Access</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>John Doe (Owner)</span>
                      <span className="text-sm text-muted-foreground">Primary Counsel</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>Jane Smith</span>
                      <span className="text-sm text-muted-foreground">Co-Counsel</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Access Removed",
                          description: "Jane Smith's access has been removed.",
                        })
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowAddCoCounsel(true)}
              className="w-full"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Access
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}