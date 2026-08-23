"use client";

import { Parent, PaginatedResponse } from "@/types";
import { mockDb } from "@/mocks/db";
import { delay } from "./api-client";

export const parentService = {
  async getParents(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<Parent>> {
    await delay(300);
    
    let parents = [...mockDb.parents];
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      parents = parents.filter(
        (p) =>
          p.firstName.toLowerCase().includes(searchLower) ||
          p.lastName.toLowerCase().includes(searchLower) ||
          p.email.toLowerCase().includes(searchLower) ||
          p.phone.includes(searchLower)
      );
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = parents.length;
    const startIndex = (page - 1) * limit;
    const paginatedParents = parents.slice(startIndex, startIndex + limit);
    
    return {
      data: paginatedParents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getParent(id: string): Promise<Parent> {
    await delay(200);
    const parent = mockDb.parents.find((p) => p.id === id);
    if (!parent) {
      throw new Error("Parent not found");
    }
    return parent;
  },

  async createParent(data: Omit<Parent, "id" | "schoolId" | "createdAt" | "updatedAt">): Promise<Parent> {
    await delay(400);
    const newParent: Parent = {
      ...data,
      id: `par_${Date.now()}`,
      schoolId: data.schoolId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDb.parents.push(newParent);
    return newParent;
  },

  async updateParent(id: string, data: Partial<Parent>): Promise<Parent> {
    await delay(400);
    const index = mockDb.parents.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Parent not found");
    }
    const updatedParent = {
      ...mockDb.parents[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mockDb.parents[index] = updatedParent;
    return updatedParent;
  },

  async deleteParent(id: string): Promise<void> {
    await delay(300);
    const index = mockDb.parents.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Parent not found");
    }
    mockDb.parents.splice(index, 1);
  },

  async getParentChildren(parentId: string) {
    await delay(200);
    return mockDb.students.filter((s) => s.parentIds?.includes(parentId));
  },
};
