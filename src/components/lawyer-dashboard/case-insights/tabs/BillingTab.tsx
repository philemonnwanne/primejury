import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PDFViewer } from "@react-pdf/renderer"
import { toast } from "sonner"
import { Invoice, BillingData } from "./types"
import { InvoicePreviewDocument } from "./billing/InvoicePreview"
import { InvoiceActions } from "./billing/InvoiceActions"
import { PendingAmountCard } from "./billing/PendingAmountCard"

interface BillingTabProps {
  isEditing: boolean
  onSave: () => void
  caseId: string
}

export function BillingTab({ isEditing, onSave, caseId }: BillingTabProps) {
  const [billingData, setBillingData] = useState<BillingData>({
    billingType: "hourly",
    rate: "250",
    totalPaid: 5000,
    pendingAmount: 2500,
    pendingInvoices: []
  })

  const [showPreview, setShowPreview] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)
  const [showAddInvoice, setShowAddInvoice] = useState(false)
  const logoUrl = "/path/to/your/logo.png" // Replace with actual logo path

  const handleCreateInvoice = (invoiceData: Invoice) => {
    setCurrentInvoice(invoiceData)
    setShowPreview(true)
  }

  const handleSaveInvoice = async (sendToClient: boolean = false) => {
    if (!currentInvoice) return

    // Update pending amount
    const newPendingAmount = billingData.pendingAmount + currentInvoice.amount
    const newPendingInvoices = [...billingData.pendingInvoices, currentInvoice]
    
    setBillingData({
      ...billingData,
      pendingAmount: newPendingAmount,
      pendingInvoices: newPendingInvoices
    })

    // Save to documents
    const documentCategory = "invoices"
    // Here you would implement the actual document saving logic

    toast.success(
      sendToClient 
        ? "Invoice saved and sent to client" 
        : "Invoice saved successfully"
    )
    
    setShowPreview(false)
    setCurrentInvoice(null)
    setShowAddInvoice(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Billing Information</h2>
        <Button onClick={() => setShowAddInvoice(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Invoice
        </Button>
      </div>

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

            <PendingAmountCard 
              pendingAmount={billingData.pendingAmount}
              pendingInvoices={billingData.pendingInvoices}
            />
          </div>

          {/* Invoice Preview Dialog */}
          {currentInvoice && (
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Invoice Preview</DialogTitle>
                </DialogHeader>
                <div className="h-[600px] mt-4">
                  <PDFViewer width="100%" height="100%">
                    <InvoicePreviewDocument 
                      invoice={currentInvoice}
                      logoUrl={logoUrl}
                    />
                  </PDFViewer>
                </div>
                <InvoiceActions
                  invoice={currentInvoice}
                  onEdit={() => setShowPreview(false)}
                  onSave={() => handleSaveInvoice(false)}
                  onSaveAndSend={() => handleSaveInvoice(true)}
                />
              </DialogContent>
            </Dialog>
          )}

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