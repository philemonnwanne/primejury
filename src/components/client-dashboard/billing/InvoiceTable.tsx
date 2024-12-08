import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Banknote, FileCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Invoice } from "./types"

interface InvoiceTableProps {
  invoices: Invoice[]
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  const { toast } = useToast()

  const handlePayment = (invoiceId: string, amount: number) => {
    toast({
      title: "Processing payment",
      description: `Payment of $${amount} for invoice ${invoiceId} is being processed.`,
    })
  }

  const getFeeStructureBadge = (feeStructure: any) => {
    const variants = {
      hourly: "default",
      flat_fee: "secondary",
      contingency: "outline"
    } as const;
    
    return (
      <div className="flex flex-col gap-1">
        <Badge variant={variants[feeStructure.type as keyof typeof variants]}>
          {feeStructure.type === 'hourly' && `Hourly Rate: $${feeStructure.rate}`}
          {feeStructure.type === 'flat_fee' && 'Flat Fee'}
          {feeStructure.type === 'contingency' && `${feeStructure.percentage}% Contingency`}
        </Badge>
        <span className="text-xs text-muted-foreground">{feeStructure.details}</span>
      </div>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Case</TableHead>
          <TableHead>Fee Structure</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.caseTitle}</TableCell>
            <TableCell>{getFeeStructureBadge(invoice.feeStructure)}</TableCell>
            <TableCell>
              {typeof invoice.amount === 'number' ? (
                <>
                  ${invoice.amount.toFixed(2)}
                  {invoice.status === "partial" && (
                    <div className="text-sm text-muted-foreground">
                      Paid: ${invoice.paid.toFixed(2)}
                    </div>
                  )}
                </>
              ) : (
                invoice.amount
              )}
            </TableCell>
            <TableCell>
              <Badge
                variant={invoice.status === "paid" ? "default" : "secondary"}
              >
                {invoice.status === "paid" ? "Paid" : "Partial Payment"}
              </Badge>
            </TableCell>
            <TableCell>
              {invoice.paymentMethod.type === "credit_card" ? (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>****{invoice.paymentMethod.last4}</span>
                </div>
              ) : invoice.paymentMethod.type === "contingency" ? (
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4" />
                  <span>Contingency Based</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  <span>****{invoice.paymentMethod.last4}</span>
                </div>
              )}
            </TableCell>
            <TableCell>
              {invoice.isIncremental ? (
                <div>
                  <div>Next: {invoice.nextPaymentDate}</div>
                  <div className="text-sm text-muted-foreground">
                    Final: {invoice.dueDate}
                  </div>
                </div>
              ) : (
                invoice.dueDate
              )}
            </TableCell>
            <TableCell>
              {invoice.status !== "paid" && invoice.paymentMethod.type !== "contingency" && (
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handlePayment(
                        invoice.id,
                        typeof invoice.amount === 'number' && typeof invoice.paid === 'number' ?
                          (invoice.isIncremental ? 
                            (invoice.amount - invoice.paid) / 4 : 
                            invoice.amount - invoice.paid) : 0
                      )
                    }
                  >
                    {invoice.isIncremental ? "Pay Next Installment" : "Pay Full Amount"}
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}