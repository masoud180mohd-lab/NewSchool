export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiClient = {
  async get<T>(url: string): Promise<T> {
    await delay(300);
    throw new Error("API not implemented - using mock data");
  },
  async post<T>(url: string, data: unknown): Promise<T> {
    await delay(300);
    throw new Error("API not implemented - using mock data");
  },
  async put<T>(url: string, data: unknown): Promise<T> {
    await delay(300);
    throw new Error("API not implemented - using mock data");
  },
  async delete(url: string): Promise<void> {
    await delay(300);
    throw new Error("API not implemented - using mock data");
  },
};
