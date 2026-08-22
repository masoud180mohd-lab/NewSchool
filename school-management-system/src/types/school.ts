export type SubscriptionStatus = 'active' | 'trial' | 'suspended' | 'cancelled' | 'expired';
export type SubscriptionPlan = 'starter' | 'standard' | 'premium';

export interface Subscription {
  id: string;
  schoolId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  trialEndsAt?: string;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  createdAt: string;
  updatedAt: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  logoUrl?: string;
  subscription?: Subscription;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
