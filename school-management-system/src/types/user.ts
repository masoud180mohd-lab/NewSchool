export type Role = 'super_admin' | 'school_admin' | 'principal' | 'teacher' | 'accountant';

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  schoolId?: string;
  permissions: string[];
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
