import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { CreateInvoiceDialog } from "./invoice/CreateInvoiceDialog"
import { toast } from "sonner"

interface BillingTabProps {
  caseId: string
  isEditing?: boolean
}

export function BillingTab({ caseId, isEditing }: BillingTabProps) {
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)
  const [invoices, setInvoices] = useState<any[]>([])

  const handleCreateInvoice = (invoice: any) => {
    setInvoices([invoice, ...invoices])
    toast.success("Invoice created successfully")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoices</CardTitle>
          <Button onClick={() => setIsCreateInvoiceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">${invoice.amount}</span>
                  <Badge variant={invoice.status === "sent" ? "secondary" : "outline"}>
                    {invoice.status || "draft"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{invoice.description}</p>
                <p className="text-xs text-muted-foreground">
                  Due: {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline" onClick={() => window.open(`/documents/${caseId}/invoices/${invoice.id}`)}>
                View Invoice
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <CreateInvoiceDialog
        open={isCreateInvoiceOpen}
        onOpenChange={setIsCreateInvoiceOpen}
        onInvoiceCreate={handleCreateInvoice}
        caseId={caseId}
      />
    </div>
  )
}