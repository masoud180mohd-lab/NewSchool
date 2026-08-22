import { MOCK_USERS } from '@/mocks/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    await delay(500);
    
    const user = MOCK_USERS.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Mock password check - in real app this would be hashed
    if (credentials.password !== 'password') {
      throw new Error('Invalid email or password');
    }
    
    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }
    
    // Return user without sensitive data
    const { ...safeUser } = user;
    return {
      user: safeUser,
      token: `mock_token_${user.id}_${Date.now()}`,
    };
  },
  
  async logout() {
    await delay(200);
    return Promise.resolve();
  },
  
  async getCurrentUser(token?: string) {
    await delay(300);
    if (!token) {
      return null;
    }
    // Extract user ID from mock token
    const userId = token.split('_')[2];
    const user = MOCK_USERS.find(u => u.id === userId);
    return user || null;
  },
};
