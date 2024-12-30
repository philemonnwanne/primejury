import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Invoice } from "../types"

interface AddInvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateInvoice: (invoice: Invoice) => void
}

export function AddInvoiceDialog({ open, onOpenChange, onCreateInvoice }: AddInvoiceDialogProps) {
  const [items, setItems] = useState<Array<{ description: string; quantity: number; amount: number }>>([
    { description: "", quantity: 1, amount: 0 }
  ])
  const [dueDate, setDueDate] = useState("")
  const [clientName, setClientName] = useState("")
  const [caseTitle, setCaseTitle] = useState("")

  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, amount: 0 }])
  }

  const handleItemChange = (index: number, field: keyof typeof items[0], value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleSubmit = () => {
    const totalAmount = items.reduce((sum, item) => sum + (item.amount * item.quantity), 0)
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      amount: totalAmount,
      date: new Date().toISOString(),
      dueDate,
      items,
      status: "draft",
      clientName,
      caseTitle
    }
    onCreateInvoice(invoice)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            <div className="space-y-2">
              <Label>Case Title</Label>
              <Input
                value={caseTitle}
                onChange={(e) => setCaseTitle(e.target.value)}
                placeholder="Enter case title"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Items</Label>
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-[2fr,1fr,1fr] gap-2">
                <Input
                  value={item.description}
                  onChange={(e) => handleItemChange(index, "description", e.target.value)}
                  placeholder="Description"
                />
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                  placeholder="Quantity"
                />
                <Input
                  type="number"
                  value={item.amount}
                  onChange={(e) => handleItemChange(index, "amount", parseFloat(e.target.value))}
                  placeholder="Amount"
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Create Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}