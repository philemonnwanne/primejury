export interface FeeStructure {
  type: 'hourly' | 'flat_fee' | 'contingency';
  rate?: number;
  amount?: number;
  percentage?: number;
  details: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'bank_account';
  last4: string;
  expiryDate?: string;
  bankName?: string;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  caseId: string;
  caseTitle: string;
  amount: number | string;
  paid: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'pending';
  paymentMethod: {
    type: string;
    last4?: string;
    percentage?: number;
  };
  isIncremental: boolean;
  nextPaymentDate?: string;
  feeStructure: FeeStructure;
}