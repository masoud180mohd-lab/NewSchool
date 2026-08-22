export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | 'half_day';

export interface AttendanceRecord {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
  recordedBy: string;
  createdAt: string;
  updatedAt: string;
}
