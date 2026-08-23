"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { parentService } from "@/services/parent-service";
import { Parent } from "@/types";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";

export function useParents(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: queryKeys.parents.list(params),
    queryFn: () => parentService.getParents(params),
  });
}

export function useParent(id: string) {
  return useQuery({
    queryKey: queryKeys.parents.detail(id),
    queryFn: () => parentService.getParent(id),
    enabled: !!id,
  });
}

export function useCreateParent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Parent, "id" | "schoolId" | "createdAt" | "updatedAt">) =>
      parentService.createParent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.parents.all });
      toast.success("Parent created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create parent");
    },
  });
}

export function useUpdateParent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Parent> }) =>
      parentService.updateParent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.parents.all });
      toast.success("Parent updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update parent");
    },
  });
}

export function useDeleteParent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => parentService.deleteParent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.parents.all });
      toast.success("Parent deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete parent");
    },
  });
}

export function useParentChildren(parentId: string) {
  return useQuery({
    queryKey: queryKeys.parents.children(parentId),
    queryFn: () => parentService.getParentChildren(parentId),
    enabled: !!parentId,
  });
}
