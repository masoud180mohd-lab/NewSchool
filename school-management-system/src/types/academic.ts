export interface AcademicYear {
  id: string;
  schoolId: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TermStatus = 'upcoming' | 'active' | 'completed';

export interface Term {
  id: string;
  schoolId: string;
  academicYearId: string;
  name: string;
  order: number;
  startDate: string;
  endDate: string;
  status: TermStatus;
  createdAt: string;
  updatedAt: string;
}
