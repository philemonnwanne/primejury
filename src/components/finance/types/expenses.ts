export interface Expense {
  id: string;
  caseId: string;
  caseTitle: string;
  description: string;
  amount: number;
  category: "filing_fees" | "evidence_fees" | "court_fees" | "other";
  date: string;
  notes?: string;
}

export const expenseCategories = [
  { value: "filing_fees", label: "Filing Fees" },
  { value: "evidence_fees", label: "Evidence Request Fees" },
  { value: "court_fees", label: "Court Fees" },
  { value: "other", label: "Other Expenses" },
] as const;