"use client";

import { Staff, PaginatedResponse } from "@/types";
import { mockDb } from "@/mocks/db";
import { delay } from "./api-client";

export const staffService = {
  async getStaff(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    department?: string;
  }): Promise<PaginatedResponse<Staff>> {
    await delay(300);
    
    let staff = [...mockDb.staff];
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      staff = staff.filter(
        (s) =>
          s.firstName.toLowerCase().includes(searchLower) ||
          s.lastName.toLowerCase().includes(searchLower) ||
          s.email.toLowerCase().includes(searchLower) ||
          s.employeeNumber.toLowerCase().includes(searchLower)
      );
    }
    
    if (params?.role) {
      staff = staff.filter((s) => s.role === params.role);
    }
    
    if (params?.department) {
      staff = staff.filter((s) => s.department === params.department);
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = staff.length;
    const startIndex = (page - 1) * limit;
    const paginatedStaff = staff.slice(startIndex, startIndex + limit);
    
    return {
      data: paginatedStaff,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getStaffMember(id: string): Promise<Staff> {
    await delay(200);
    const member = mockDb.staff.find((s) => s.id === id);
    if (!member) {
      throw new Error("Staff member not found");
    }
    return member;
  },

  async createStaff(data: Omit<Staff, "id" | "schoolId" | "createdAt" | "updatedAt">): Promise<Staff> {
    await delay(400);
    const newStaff: Staff = {
      ...data,
      id: `stf_${Date.now()}`,
      schoolId: data.schoolId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDb.staff.push(newStaff);
    return newStaff;
  },

  async updateStaff(id: string, data: Partial<Staff>): Promise<Staff> {
    await delay(400);
    const index = mockDb.staff.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Staff member not found");
    }
    const updatedStaff = {
      ...mockDb.staff[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mockDb.staff[index] = updatedStaff;
    return updatedStaff;
  },

  async deleteStaff(id: string): Promise<void> {
    await delay(300);
    const index = mockDb.staff.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Staff member not found");
    }
    mockDb.staff.splice(index, 1);
  },
};
