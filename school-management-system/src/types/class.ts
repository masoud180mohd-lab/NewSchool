export interface Class {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  grade: number;
  teacherId?: string;
  capacity: number;
  enrolledCount: number;
  academicYearId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  description?: string;
  classIds: string[];
  teacherId?: string;
  createdAt: string;
  updatedAt: string;
}
