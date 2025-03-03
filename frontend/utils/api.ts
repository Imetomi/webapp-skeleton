import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { auth } from './firebase';
import { SubscriptionPlan, SubscriptionStatus } from '../types/subscription';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Important for CORS
});

// Request interceptor
api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true); // Force refresh token
      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  } catch (error) {
    return config;
  }
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Subscription related API calls
export const subscriptionApi = {
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    const response = await api.get('/payments/plans');
    return response.data;
  },
  
  getUserSubscriptions: async (): Promise<SubscriptionStatus[]> => {
    const response = await api.get('/payments/subscriptions');
    return response.data;
  },

  createCheckoutSession: async (planId: number): Promise<{ checkout_url: string }> => {
    const response = await api.post(`/payments/create-checkout-session/${planId}`);
    return response.data;
  },

  cancelSubscription: async (subscriptionId: number): Promise<SubscriptionStatus> => {
    const response = await api.post(`/payments/cancel?subscription_id=${subscriptionId}`);
    return response.data;
  },
};

export default api; 