import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { InvoicePreview } from "./InvoicePreview"

interface CreateInvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvoiceCreate: (invoice: any) => void
  caseId: string
}

export function CreateInvoiceDialog({
  open,
  onOpenChange,
  onInvoiceCreate,
  caseId,
}: CreateInvoiceDialogProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [invoice, setInvoice] = useState({
    id: `INV-${Date.now()}`,
    amount: "",
    description: "",
    dueDate: "",
    items: [
      {
        description: "",
        hours: "",
        rate: "",
        amount: "",
      },
    ],
  })

  const handlePreview = () => {
    if (!invoice.amount || !invoice.dueDate) {
      return
    }
    setShowPreview(true)
  }

  const handleSave = () => {
    onInvoiceCreate(invoice)
    setShowPreview(false)
    onOpenChange(false)
  }

  const handleSaveAndSend = () => {
    onInvoiceCreate({ ...invoice, status: "sent" })
    setShowPreview(false)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                value={invoice.amount}
                onChange={(e) =>
                  setInvoice({ ...invoice, amount: e.target.value })
                }
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={invoice.description}
                onChange={(e) =>
                  setInvoice({ ...invoice, description: e.target.value })
                }
                placeholder="Enter invoice description"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Input
                type="date"
                value={invoice.dueDate}
                onChange={(e) =>
                  setInvoice({ ...invoice, dueDate: e.target.value })
                }
              />
            </div>
            <Button onClick={handlePreview} className="w-full">
              Preview Invoice
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <InvoicePreview
        open={showPreview}
        onOpenChange={setShowPreview}
        invoice={invoice}
        onSave={handleSave}
        onSaveAndSend={handleSaveAndSend}
        onEdit={() => setShowPreview(false)}
        caseId={caseId}
      />
    </>
  )
}