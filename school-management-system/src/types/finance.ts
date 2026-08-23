export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'partial' | 'overdue' | 'cancelled';

export interface Invoice {
  id: string;
  schoolId: string;
  invoiceNumber: string;
  studentId: string;
  feeStructureId?: string;
  academicYearId: string;
  termId?: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  items: {
    description: string;
    amount: number;
    quantity: number;
    total: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  currency: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod = 'cash' | 'bank_transfer' | 'mobile_money' | 'card' | 'cheque' | 'other';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  schoolId: string;
  paymentNumber: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  reference?: string;
  paidAt: string;
  receivedBy?: string;
  notes?: string;
  receiptId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Receipt {
  id: string;
  schoolId: string;
  receiptNumber: string;
  paymentId: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  currency: string;
  issuedBy: string;
  issuedAt: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
