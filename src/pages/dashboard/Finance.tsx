import { DashboardLayout } from "@/layouts/DashboardLayout"
import { FinancialOverview } from "@/components/finance/FinancialOverview"
import { InvoiceList } from "@/components/finance/InvoiceList"
import { ExpenseList } from "@/components/finance/ExpenseList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Finance() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
          <p className="text-muted-foreground">
            Manage invoices, track expenses, and monitor revenue
          </p>
        </div>
        <FinancialOverview />
        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent value="invoices" className="space-y-4">
            <InvoiceList />
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4">
            <ExpenseList />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}