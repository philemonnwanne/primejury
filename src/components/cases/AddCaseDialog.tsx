import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CaseTypeForm } from "./CaseTypeForm"

export function AddCaseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Case</Button>
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