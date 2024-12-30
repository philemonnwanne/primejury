import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Invoice } from "../types"

interface InvoiceActionsProps {
  invoice: Invoice
  onEdit: () => void
  onSave: () => void
  onSaveAndSend: () => void
}

export function InvoiceActions({ invoice, onEdit, onSave, onSaveAndSend }: InvoiceActionsProps) {
  return (
    <div className="flex gap-4 mt-4">
      <Button variant="outline" onClick={onEdit}>
        Edit Further
      </Button>
      <Button variant="secondary" onClick={onSave}>
        Save Draft
      </Button>
      <Button onClick={onSaveAndSend}>
        Save & Send to Client
      </Button>
    </div>
  )
}