import { Role } from "@/types/user";
import { 
  LayoutDashboard, 
  Building2, 
  Settings, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CalendarDays, 
  FileText, 
  ClipboardCheck, 
  DollarSign, 
  Receipt, 
  Megaphone, 
  BarChart3,
  UserCog,
  School
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: Role[];
}

export const PERMISSIONS: Record<Role, string[]> = {
  super_admin: ["*"],
  school_admin: ["students:view", "students:create", "students:edit", "students:delete", "parents:view", "parents:create", "staff:view", "staff:create", "classes:view", "subjects:view", "attendance:view", "exams:view", "marks:view", "reports:view", "finance:view", "settings:manage"],
  principal: ["students:view", "staff:view", "classes:view", "subjects:view", "attendance:view", "exams:view", "marks:view", "reports:view"],
  teacher: ["classes:view", "attendance:create", "marks:view", "marks:create", "reports:view"],
  accountant: ["finance:view", "finance:create", "invoices:view", "invoices:create", "payments:view", "payments:create", "reports:view"],
};

export function can(user: { role: Role } | null, permission: string): boolean {
  if (!user) return false;
  const userPermissions = PERMISSIONS[user.role] || [];
  if (userPermissions.includes("*")) return true;
  return userPermissions.includes(permission);
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/super-admin/dashboard", icon: LayoutDashboard, roles: ["super_admin"] },
  { title: "Schools", href: "/super-admin/schools", icon: Building2, roles: ["super_admin"] },
  { title: "Settings", href: "/super-admin/settings", icon: Settings, roles: ["super_admin"] },
  { title: "Dashboard", href: "/school/dashboard", icon: LayoutDashboard, roles: ["school_admin", "principal", "teacher", "accountant"] },
  { title: "Students", href: "/school/students", icon: GraduationCap, roles: ["school_admin"] },
  { title: "Parents", href: "/school/parents", icon: Users, roles: ["school_admin"] },
  { title: "Staff", href: "/school/staff", icon: Users, roles: ["school_admin", "principal"] },
  { title: "Classes", href: "/school/classes", icon: School, roles: ["school_admin", "principal", "teacher"] },
  { title: "Subjects", href: "/school/subjects", icon: BookOpen, roles: ["school_admin", "principal", "teacher"] },
  { title: "Attendance", href: "/school/attendance", icon: CalendarDays, roles: ["school_admin", "principal", "teacher"] },
  { title: "Exams", href: "/school/exams", icon: ClipboardCheck, roles: ["school_admin", "principal", "teacher"] },
  { title: "Marks", href: "/school/marks", icon: FileText, roles: ["school_admin", "principal", "teacher"] },
  { title: "Report Cards", href: "/school/report-cards", icon: FileText, roles: ["school_admin", "principal", "teacher"] },
  { title: "Fee Structures", href: "/school/finance/fee-structures", icon: DollarSign, roles: ["school_admin", "accountant"] },
  { title: "Invoices", href: "/school/finance/invoices", icon: Receipt, roles: ["school_admin", "accountant"] },
  { title: "Payments", href: "/school/finance/payments", icon: DollarSign, roles: ["school_admin", "accountant"] },
  { title: "Announcements", href: "/school/announcements", icon: Megaphone, roles: ["school_admin"] },
  { title: "Reports", href: "/school/reports", icon: BarChart3, roles: ["school_admin", "principal", "accountant"] },
  { title: "Settings", href: "/school/settings", icon: Settings, roles: ["school_admin"] },
];

export function getNavigationItemsByRole(role: Role): NavItem[] {
  return NAVIGATION_ITEMS.filter(item => item.roles?.includes(role));
}
