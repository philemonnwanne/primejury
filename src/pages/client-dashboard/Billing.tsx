import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { InvoiceTable } from "@/components/client-dashboard/billing/InvoiceTable"
import { PaymentMethodsList } from "@/components/client-dashboard/billing/PaymentMethodsList"

// Mock data - in a real app, this would come from an API
const mockInvoices = [
  {
    id: "INV001",
    caseId: "CASE001",
    caseTitle: "Smith vs. Johnson",
    amount: 5000,
    paid: 2000,
    dueDate: "2024-04-30",
    status: "partial",
    paymentMethod: {
      type: "credit_card",
      last4: "4242",
    },
    isIncremental: true,
    nextPaymentDate: "2024-04-15",
    feeStructure: {
      type: "hourly",
      rate: 350,
      details: "Billed at $350/hour with detailed time tracking"
    }
  },
  {
    id: "INV002",
    caseId: "CASE002",
    caseTitle: "Property Dispute",
    amount: 3000,
    paid: 3000,
    dueDate: "2024-03-15",
    status: "paid",
    paymentMethod: {
      type: "bank_transfer",
      last4: "9876",
    },
    isIncremental: false,
    feeStructure: {
      type: "flat_fee",
      amount: 3000,
      details: "One-time flat fee for entire case representation"
    }
  },
  {
    id: "INV003",
    caseId: "CASE003",
    caseTitle: "Personal Injury Claim",
    amount: "TBD",
    paid: 0,
    dueDate: "Upon settlement",
    status: "pending",
    paymentMethod: {
      type: "contingency",
      percentage: 33
    },
    isIncremental: false,
    feeStructure: {
      type: "contingency",
      percentage: 33,
      details: "33% of settlement amount upon successful resolution"
    }
  }
]

const mockPaymentMethods = [
  {
    id: "PM001",
    type: "credit_card",
    last4: "4242",
    expiryDate: "12/25",
    isDefault: true,
  },
  {
    id: "PM002",
    type: "bank_account",
    last4: "9876",
    bankName: "Chase",
    isDefault: false,
  },
]

export default function ClientBilling() {
  const [activeTab, setActiveTab] = useState("invoices")
  const { toast } = useToast()

  const handleAddPaymentMethod = () => {
    toast({
      title: "Add payment method",
      description: "This feature will be implemented soon.",
    })
  }

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage your invoices and payment methods
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            <InvoiceTable invoices={mockInvoices} />
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={handleAddPaymentMethod}>
                Add Payment Method
              </Button>
            </div>
            <PaymentMethodsList paymentMethods={mockPaymentMethods} />
          </TabsContent>
        </Tabs>
      </div>
    </ClientDashboardLayout>
  )
}
