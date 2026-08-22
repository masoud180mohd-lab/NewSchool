export interface Announcement {
  id: string;
  schoolId: string;
  title: string;
  content: string;
  type: 'general' | 'academic' | 'event' | 'emergency' | 'holiday';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: 'all' | 'students' | 'parents' | 'staff' | 'teachers' | 'accountants';
  classIds?: string[];
  publishAt: string;
  expiresAt?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  schoolId: string;
  userId?: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface ReportItem {
  id: string;
  schoolId: string;
  name: string;
  type: 'student_list' | 'attendance' | 'exam_results' | 'fee_collection' | 'outstanding_fees' | 'staff_list';
  filters: Record<string, unknown>;
  generatedBy: string;
  generatedAt: string;
  format: 'pdf' | 'excel' | 'csv';
  url?: string;
}

export interface Settings {
  id: string;
  schoolId: string;
  key: string;
  value: string | number | boolean | object;
  category: 'general' | 'academic' | 'finance' | 'notification' | 'system';
  description?: string;
  updatedAt: string;
  updatedBy: string;
}
