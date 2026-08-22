export type ExamType = 'term' | 'mid_term' | 'annual' | 'quiz' | 'assignment' | 'practical';

export interface Exam {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  type: ExamType;
  termId: string;
  academicYearId: string;
  startDate: string;
  endDate: string;
  classIds: string[];
  subjectIds: string[];
  totalMarks: number;
  passingMarks: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Mark {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  subjectId: string;
  marksObtained: number;
  totalMarks: number;
  grade?: string;
  remarks?: string;
  gradedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportCard {
  id: string;
  schoolId: string;
  studentId: string;
  examId: string;
  termId: string;
  academicYearId: string;
  classId: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  position?: number;
  remarks?: string;
  teacherRemarks?: string;
  principalRemarks?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
