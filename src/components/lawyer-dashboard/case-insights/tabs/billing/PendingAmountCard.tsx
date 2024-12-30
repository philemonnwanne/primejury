import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Invoice } from "../types"

interface PendingAmountCardProps {
  pendingAmount: number
  pendingInvoices: Invoice[]
}

export function PendingAmountCard({ pendingAmount, pendingInvoices }: PendingAmountCardProps) {
  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Pending Amount</p>
            <p className="text-2xl font-bold">${pendingAmount.toFixed(2)}</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">View Details</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Pending Invoices</SheetTitle>
                <SheetDescription>
                  Detailed breakdown of pending amounts
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {pendingInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Invoice #{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.description}</p>
                      <p className="text-sm">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${invoice.amount}</p>
                      <Badge variant="outline">{invoice.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  )
}