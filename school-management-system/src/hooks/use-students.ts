"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "@/services/student-service";
import { Student } from "@/types";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";

export function useStudents(params?: {
  page?: number;
  limit?: number;
  search?: string;
  classId?: string;
  gender?: string;
}) {
  return useQuery({
    queryKey: queryKeys.students.list(params),
    queryFn: () => studentService.getStudents(params),
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: queryKeys.students.detail(id),
    queryFn: () => studentService.getStudent(id),
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Student, "id" | "schoolId" | "createdAt" | "updatedAt">) =>
      studentService.createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      toast.success("Student created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create student");
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Student> }) =>
      studentService.updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      toast.success("Student updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update student");
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => studentService.deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      toast.success("Student deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete student");
    },
  });
}

export function useStudentParents(studentId: string) {
  return useQuery({
    queryKey: queryKeys.students.parents(studentId),
    queryFn: () => studentService.getStudentParents(studentId),
    enabled: !!studentId,
  });
}
