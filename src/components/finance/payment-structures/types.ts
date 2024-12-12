export interface Case {
  id: string
  title: string
  currentStructure: PaymentStructure
}

export interface PaymentStructure {
  type: "hourly" | "flat_fee" | "contingency" | "installments"
  details: {
    rate?: number
    amount?: number
    percentage?: number
    installments?: number
    frequency?: "weekly" | "biweekly" | "monthly" | "quarterly"
  }
}