import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CaseTypeForm } from "./CaseTypeForm"

interface AddCaseDialogProps {
  children?: React.ReactNode
}

export function AddCaseDialog({ children }: AddCaseDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || <Button>Add Case</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Case</DialogTitle>
        </DialogHeader>
        <CaseTypeForm />
      </DialogContent>
    </Dialog>
  )
}