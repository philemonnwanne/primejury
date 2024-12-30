import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
  from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface BillingTabProps {
  isEditing: boolean
  initialData: any
  onSave: () => void
  caseId: string
}

interface Invoice {
  id: string
  amount: number
  description: string
  dueDate: string
  status: "draft" | "sent" | "paid"
  createdAt: string
}

export function BillingTab({ isEditing, initialData, onSave, caseId }: BillingTabProps) {
  const [billingData, setBillingData] = useState(initialData)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [newInvoice, setNewInvoice] = useState({
    amount: "",
    description: "",
    dueDate: "",
  })

  const handleCreateInvoice = () => {
    if (!newInvoice.amount || !newInvoice.dueDate) return

    const invoice: Invoice = {
      id: Date.now().toString(),
      amount: Number(newInvoice.amount),
      description: newInvoice.description,
      dueDate: newInvoice.dueDate,
      status: "draft",
      createdAt: new Date().toISOString()
    }

    setInvoices([invoice, ...invoices])
    setNewInvoice({
      amount: "",
      description: "",
      dueDate: "",
    })
  }

  const handleSendInvoice = (invoiceId: string) => {
    setInvoices(invoices.map(invoice =>
      invoice.id === invoiceId ? { ...invoice, status: "sent" } : invoice
    ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Billing Type</label>
              {isEditing ? (
                <Select
                  value={billingData.billingType}
                  onValueChange={(value) =>
                    setBillingData({ ...billingData, billingType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="flat">Flat Fee</SelectItem>
                    <SelectItem value="contingency">Contingency</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-muted-foreground">{billingData.billingType}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rate/Amount</label>
              {isEditing ? (
                <Input
                  type="number"
                  value={billingData.rate}
                  onChange={(e) =>
                    setBillingData({ ...billingData, rate: e.target.value })
                  }
                  placeholder="Enter amount"
                />
              ) : (
                <p className="text-muted-foreground">${billingData.rate}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Total Paid</p>
                    <p className="text-2xl font-bold">${billingData.totalPaid}</p>
                  </div>
                  <Badge variant="secondary">Paid</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Pending Amount</p>
                    <p className="text-2xl font-bold">${billingData.pendingAmount}</p>
                  </div>
                  <Badge variant="destructive">Pending</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Invoices</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Invoice</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount</label>
                      <Input
                        type="number"
                        value={newInvoice.amount}
                        onChange={(e) => setNewInvoice({
                          ...newInvoice,
                          amount: e.target.value
                        })}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={newInvoice.description}
                        onChange={(e) => setNewInvoice({
                          ...newInvoice,
                          description: e.target.value
                        })}
                        placeholder="Enter invoice description"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Due Date</label>
                      <Input
                        type="date"
                        value={newInvoice.dueDate}
                        onChange={(e) => setNewInvoice({
                          ...newInvoice,
                          dueDate: e.target.value
                        })}
                      />
                    </div>
                    <Button onClick={handleCreateInvoice} className="w-full">
                      Create Invoice
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">${invoice.amount}</span>
                      <Badge variant={
                        invoice.status === "paid" ? "default" :
                        invoice.status === "sent" ? "secondary" : "outline"
                      }>
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{invoice.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  {invoice.status === "draft" && (
                    <Button
                      variant="outline"
                      onClick={() => handleSendInvoice(invoice.id)}
                    >
                      Send to Client
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isEditing && (
            <Button onClick={onSave} className="w-full">
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}