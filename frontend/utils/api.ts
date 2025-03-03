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
    console.log('Request interceptor - checking auth state...');
    const user = auth.currentUser;
    console.log('Current user:', user ? { uid: user.uid, email: user.email } : 'No user');
    
    if (user) {
      console.log('Getting ID token for user...');
      const token = await user.getIdToken(true); // Force refresh token
      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
        console.log('=== FULL FIREBASE TOKEN FOR TESTING ===');
        console.log(`Bearer ${token}`);
        console.log('=====================================');
        console.log('Full request config:', {
          url: config.url,
          method: config.method,
          headers: {
            ...config.headers,
            Authorization: 'Bearer [hidden]' // Don't log the token in production
          }
        });
      }
    } else {
      console.log('No authenticated user found');
    }
    return config;
  } catch (error) {
    console.error('Error in request interceptor:', error);
    return config;
  }
});

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error: AxiosError) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      requestHeaders: error.config?.headers,
    });
    return Promise.reject(error);
  }
);

// Subscription related API calls
export const subscriptionApi = {
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    console.log('Fetching subscription plans...');
    const response = await api.get('/payments/plans');
    console.log('Subscription plans response:', response.data);
    return response.data;
  },
  
  getUserSubscriptions: async (): Promise<SubscriptionStatus[]> => {
    console.log('Fetching user subscriptions...');
    const response = await api.get('/payments/subscriptions');
    console.log('User subscriptions response:', response.data);
    return response.data;
  },

  createCheckoutSession: async (planId: number): Promise<{ checkout_url: string }> => {
    console.log('Creating checkout session for plan:', planId);
    const response = await api.post(`/payments/create-checkout-session/${planId}`);
    console.log('Checkout session response:', response.data);
    return response.data;
  },
};

export default api; 