import { School } from '@/types';
import { MOCK_SCHOOLS } from '@/mocks/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const schoolService = {
  async getAllSchools() {
    await delay(500);
    return MOCK_SCHOOLS;
  },
  
  async getSchoolById(id: string) {
    await delay(300);
    const school = MOCK_SCHOOLS.find(s => s.id === id);
    if (!school) {
      throw new Error('School not found');
    }
    return school;
  },
  
  async createSchool(data: Partial<School>) {
    await delay(500);
    // Mock creation - in real app would save to database
    const newSchool: School = {
      id: `school_${Date.now()}`,
      name: data.name || 'New School',
      code: data.code || `SCH-${Date.now()}`,
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || '',
      city: data.city || '',
      country: data.country || '',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newSchool;
  },
  
  async updateSchool(id: string, data: Partial<School>) {
    await delay(400);
    const school = MOCK_SCHOOLS.find(s => s.id === id);
    if (!school) {
      throw new Error('School not found');
    }
    return { ...school, ...data, updatedAt: new Date().toISOString() };
  },
  
  async suspendSchool(id: string) {
    await delay(300);
    const school = MOCK_SCHOOLS.find(s => s.id === id);
    if (!school) {
      throw new Error('School not found');
    }
    return { ...school, isActive: false, updatedAt: new Date().toISOString() };
  },
  
  async reactivateSchool(id: string) {
    await delay(300);
    const school = MOCK_SCHOOLS.find(s => s.id === id);
    if (!school) {
      throw new Error('School not found');
    }
    return { ...school, isActive: true, updatedAt: new Date().toISOString() };
  },
};
