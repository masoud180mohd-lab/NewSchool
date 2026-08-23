"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { staffService } from "@/services/staff-service";
import { Staff } from "@/types";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";

export function useStaff(params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  department?: string;
}) {
  return useQuery({
    queryKey: queryKeys.staff.list(params),
    queryFn: () => staffService.getStaff(params),
  });
}

export function useStaffMember(id: string) {
  return useQuery({
    queryKey: queryKeys.staff.detail(id),
    queryFn: () => staffService.getStaffMember(id),
    enabled: !!id,
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Staff, "id" | "schoolId" | "createdAt" | "updatedAt">) =>
      staffService.createStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
      toast.success("Staff member created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create staff member");
    },
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Staff> }) =>
      staffService.updateStaff(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
      toast.success("Staff member updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update staff member");
    },
  });
}

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => staffService.deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
      toast.success("Staff member deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete staff member");
    },
  });
}
