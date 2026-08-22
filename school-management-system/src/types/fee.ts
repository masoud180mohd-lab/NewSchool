export type FeeType = 'tuition' | 'examination' | 'library' | 'sports' | 'transport' | 'boarding' | 'uniform' | 'books' | 'other';
export type FeeFrequency = 'once' | 'monthly' | 'quarterly' | 'termly' | 'yearly';

export interface FeeComponent {
  id: string;
  schoolId: string;
  name: string;
  type: FeeType;
  amount: number;
  currency: string;
  frequency: FeeFrequency;
  isOptional: boolean;
  applicableClassIds?: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeeStructure {
  id: string;
  schoolId: string;
  name: string;
  classId: string;
  academicYearId: string;
  termId?: string;
  components: FeeComponent[];
  totalAmount: number;
  currency: string;
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo?: string;
  createdAt: string;
  updatedAt: string;
}
