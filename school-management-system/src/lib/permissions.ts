import { User, Role } from '@/types';

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  super_admin: ['*'],
  school_admin: [
    'manage_all',
    'view_dashboard',
    'manage_students',
    'manage_parents',
    'manage_staff',
    'manage_classes',
    'manage_subjects',
    'manage_attendance',
    'manage_exams',
    'manage_marks',
    'manage_report_cards',
    'manage_fees',
    'manage_invoices',
    'manage_payments',
    'manage_announcements',
    'view_reports',
    'manage_settings',
  ],
  principal: [
    'view_dashboard',
    'view_students',
    'view_parents',
    'view_staff',
    'view_classes',
    'view_subjects',
    'manage_attendance',
    'manage_exams',
    'manage_marks',
    'manage_report_cards',
    'view_fees',
    'view_invoices',
    'view_payments',
    'manage_announcements',
    'view_reports',
  ],
  teacher: [
    'view_dashboard',
    'view_students',
    'view_parents',
    'mark_attendance',
    'enter_marks',
    'view_report_cards',
    'view_classes',
    'view_subjects',
  ],
  accountant: [
    'view_dashboard',
    'manage_fees',
    'create_invoices',
    'record_payments',
    'view_students',
    'view_reports',
    'manage_receipts',
  ],
};

export function can(user: User | null, permission: string): boolean {
  if (!user) return false;
  
  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  
  // Super admin has all permissions
  if (userPermissions.includes('*')) return true;
  
  return userPermissions.includes(permission);
}

export function hasAnyPermission(user: User | null, permissions: string[]): boolean {
  return permissions.some(permission => can(user, permission));
}

export function getRoleDisplayName(role: Role): string {
  const displayNames: Record<Role, string> = {
    super_admin: 'Super Administrator',
    school_admin: 'School Administrator',
    principal: 'Principal',
    teacher: 'Teacher',
    accountant: 'Accountant',
  };
  return displayNames[role] || role;
}
