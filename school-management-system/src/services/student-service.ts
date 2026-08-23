"use client";

import { Student, PaginatedResponse } from "@/types";
import { mockDb } from "@/mocks/db";
import { delay } from "./api-client";

const enrichStudent = (s: typeof mockDb.students[0]): Student => ({
  ...s,
  createdAt: s.createdAt || new Date().toISOString(),
  updatedAt: s.updatedAt || new Date().toISOString(),
});

export const studentService = {
  async getStudents(params?: {
    page?: number;
    limit?: number;
    search?: string;
    classId?: string;
    gender?: string;
  }): Promise<PaginatedResponse<Student>> {
    await delay(300);
    
    let students = [...mockDb.students];
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      students = students.filter(
        (s) =>
          s.firstName.toLowerCase().includes(searchLower) ||
          s.lastName.toLowerCase().includes(searchLower) ||
          s.admissionNumber.toLowerCase().includes(searchLower)
      );
    }
    
    if (params?.classId) {
      students = students.filter((s) => s.classId === params.classId);
    }
    
    if (params?.gender) {
      students = students.filter((s) => s.gender === params.gender);
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = students.length;
    const startIndex = (page - 1) * limit;
    const paginatedStudents = students.slice(startIndex, startIndex + limit).map(enrichStudent);
    
    return {
      data: paginatedStudents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getStudent(id: string): Promise<Student> {
    await delay(200);
    const student = mockDb.students.find((s) => s.id === id);
    if (!student) {
      throw new Error("Student not found");
    }
    return enrichStudent(student);
  },

  async createStudent(data: Omit<Student, "id" | "createdAt" | "updatedAt">): Promise<Student> {
    await delay(400);
    const now = new Date().toISOString();
    const newStudent: Student = {
      ...data,
      id: `stu_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    } as Student;
    mockDb.students.push(newStudent);
    return newStudent;
  },

  async updateStudent(id: string, data: Partial<Student>): Promise<Student> {
    await delay(400);
    const index = mockDb.students.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Student not found");
    }
    const updatedStudent = {
      ...mockDb.students[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mockDb.students[index] = updatedStudent as typeof mockDb.students[0];
    return enrichStudent(updatedStudent);
  },

  async deleteStudent(id: string): Promise<void> {
    await delay(300);
    const index = mockDb.students.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Student not found");
    }
    mockDb.students.splice(index, 1);
  },

  async getStudentParents(studentId: string) {
    await delay(200);
    return mockDb.parents.filter((p) => p.studentIds?.includes(studentId));
  },
};
