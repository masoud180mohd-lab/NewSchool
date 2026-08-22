export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    currentUser: ['auth', 'currentUser'] as const,
  },
  dashboard: {
    all: ['dashboard'] as const,
    superAdminStats: ['dashboard', 'superAdmin'] as const,
    schoolStats: (schoolId: string) => ['dashboard', 'school', schoolId] as const,
  },
  schools: {
    all: ['schools'] as const,
    list: ['schools', 'list'] as const,
    detail: (id: string) => ['schools', 'detail', id] as const,
  },
  students: {
    all: ['students'] as const,
    list: (schoolId: string) => ['students', 'list', schoolId] as const,
    detail: (id: string) => ['students', 'detail', id] as const,
  },
  parents: {
    all: ['parents'] as const,
    list: (schoolId: string) => ['parents', 'list', schoolId] as const,
    detail: (id: string) => ['parents', 'detail', id] as const,
  },
  staff: {
    all: ['staff'] as const,
    list: (schoolId: string) => ['staff', 'list', schoolId] as const,
    detail: (id: string) => ['staff', 'detail', id] as const,
  },
  classes: {
    all: ['classes'] as const,
    list: (schoolId: string) => ['classes', 'list', schoolId] as const,
  },
  subjects: {
    all: ['subjects'] as const,
    list: (schoolId: string) => ['subjects', 'list', schoolId] as const,
  },
  attendance: {
    all: ['attendance'] as const,
    list: (schoolId: string, date?: string) => ['attendance', 'list', schoolId, date] as const,
  },
  exams: {
    all: ['exams'] as const,
    list: (schoolId: string) => ['exams', 'list', schoolId] as const,
  },
  marks: {
    all: ['marks'] as const,
    list: (examId: string) => ['marks', 'list', examId] as const,
  },
  reportCards: {
    all: ['reportCards'] as const,
    list: (studentId: string) => ['reportCards', 'list', studentId] as const,
  },
  fees: {
    all: ['fees'] as const,
    structures: (schoolId: string) => ['fees', 'structures', schoolId] as const,
  },
  invoices: {
    all: ['invoices'] as const,
    list: (schoolId: string) => ['invoices', 'list', schoolId] as const,
    detail: (id: string) => ['invoices', 'detail', id] as const,
  },
  payments: {
    all: ['payments'] as const,
    list: (schoolId: string) => ['payments', 'list', schoolId] as const,
  },
};
