import { QueryKey } from "@tanstack/react-query";

export const queryKeys = {
  schools: {
    all: ["schools"] as QueryKey,
    list: (params?: unknown) => [...queryKeys.schools.all, "list", params] as QueryKey,
    detail: (id: string) => [...queryKeys.schools.all, "detail", id] as QueryKey,
  },
  students: {
    all: ["students"] as QueryKey,
    list: (params?: unknown) => [...queryKeys.students.all, "list", params] as QueryKey,
    detail: (id: string) => [...queryKeys.students.all, "detail", id] as QueryKey,
    parents: (studentId: string) => [...queryKeys.students.all, "parents", studentId] as QueryKey,
  },
  parents: {
    all: ["parents"] as QueryKey,
    list: (params?: unknown) => [...queryKeys.parents.all, "list", params] as QueryKey,
    detail: (id: string) => [...queryKeys.parents.all, "detail", id] as QueryKey,
    children: (parentId: string) => [...queryKeys.parents.all, "children", parentId] as QueryKey,
  },
  staff: {
    all: ["staff"] as QueryKey,
    list: (params?: unknown) => [...queryKeys.staff.all, "list", params] as QueryKey,
    detail: (id: string) => [...queryKeys.staff.all, "detail", id] as QueryKey,
  },
};
