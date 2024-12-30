export interface Invoice {
  id: string
  amount: number
  date: string
  dueDate: string
  items: Array<{
    description: string
    amount: number
    quantity: number
  }>
  status: 'draft' | 'pending' | 'paid'
  clientName: string
  caseTitle: string
}

export interface BillingData {
  billingType: string
  rate: string
  totalPaid: number
  pendingAmount: number
  pendingInvoices: Invoice[]
}