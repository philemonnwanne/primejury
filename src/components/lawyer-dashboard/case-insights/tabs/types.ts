export interface InvoiceItem {
  description: string
  hours?: number
  rate?: number
  amount: number
}

export interface Invoice {
  id: string
  amount: number
  description: string
  dueDate: string
  status: "draft" | "sent" | "paid" | "overdue"
  items?: InvoiceItem[]
}

export interface BillingData {
  billingType: string
  rate: string
  totalPaid: number
  pendingAmount: number
  pendingInvoices: Invoice[]
}