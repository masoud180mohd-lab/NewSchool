import { MOCK_DASHBOARD_STATS, MOCK_SCHOOLS } from '@/mocks/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardService = {
  async getSuperAdminStats() {
    await delay(400);
    return MOCK_DASHBOARD_STATS.superAdmin;
  },

  async getSchoolStats(schoolId?: string) {
    await delay(400);
    // In real app, filter by schoolId
    return MOCK_DASHBOARD_STATS.school;
  },

  async getRecentSchools() {
    await delay(400);
    return MOCK_SCHOOLS.slice(0, 5);
  },
};
