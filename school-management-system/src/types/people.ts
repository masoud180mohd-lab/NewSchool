export type Gender = 'male' | 'female' | 'other';
export type StudentStatus = 'active' | 'inactive' | 'graduated' | 'suspended' | 'expelled';

export interface Student {
  id: string;
  schoolId: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup?: string;
  nationality?: string;
  photoUrl?: string;
  classId: string;
  parentId?: string;
  status: StudentStatus;
  enrollmentDate: string;
  graduationDate?: string;
  address?: string;
  city?: string;
  medicalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Parent {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address?: string;
  city?: string;
  occupation?: string;
  relationship: 'father' | 'mother' | 'guardian' | 'other';
  studentIds: string[];
  createdAt: string;
  updatedAt: string;
}

export type StaffType = 'teaching' | 'administrative' | 'support';
export type StaffStatus = 'active' | 'inactive' | 'terminated' | 'on_leave';

export interface Staff {
  id: string;
  schoolId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  address?: string;
  city?: string;
  photoUrl?: string;
  type: StaffType;
  position: string;
  department?: string;
  qualification?: string;
  experienceYears?: number;
  salary?: number;
  currency?: string;
  joinDate: string;
  endDate?: string;
  status: StaffStatus;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: string;
  updatedAt: string;
}
