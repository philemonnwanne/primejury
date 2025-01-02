export interface BillingTabProps {
  isEditing: boolean;
  initialData?: {
    billingType: string;
    rate: string;
    schedule: string;
    totalPaid: number;
    pendingAmount: number;
    nextPaymentDate: string;
    paymentMethod: {
      type: string;
      last4: string;
    };
    paymentHistory: Array<{
      date: string;
      amount: number;
      status: string;
    }>;
  };
  onSave: () => void;
  caseId: string;
}