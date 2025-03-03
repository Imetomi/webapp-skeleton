import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import * as Tabs from '@radix-ui/react-tabs';
import { BarChart, Users, Settings, Bell, FileText, CreditCard, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PricingCard } from '../pricing/PricingCard';
import { subscriptionApi } from '../../utils/api';
import { SubscriptionPlan, SubscriptionStatus } from '../../types/subscription';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import DashboardLayout from './DashboardLayout';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [plansResponse, subscriptionResponse] = await Promise.all([
          subscriptionApi.getPlans(),
          subscriptionApi.getUserSubscriptions(),
        ]);
        setPlans(plansResponse);
        setCurrentSubscription(subscriptionResponse[0] || null);
      } catch (error) {
        setError('Failed to fetch dashboard data');
        setIsLoading(false);
      } finally {
        setLoading(false);
      }
    };

    // Check for successful Stripe checkout
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      // Clear the session_id from URL
      window.history.replaceState({}, '', window.location.pathname);
      toast.success('Your subscription has been activated!');
    }

    fetchData();
  }, []);

  // Find the current plan details
  const currentPlan = currentSubscription 
    ? plans.find(plan => plan.id === currentSubscription.plan_id)
    : null;

  // Format date to readable string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleSubscribe = async (planId: number) => {
    try {
      const response = await subscriptionApi.createCheckoutSession(planId);
      if (response.checkout_url) {
        window.location.href = response.checkout_url;
      }
    } catch (error) {
      setError('Failed to create checkout session');
      setIsLoading(false);
    }
  };

  const handleCancel = async (subscriptionId: number) => {
    try {
      await subscriptionApi.cancelSubscription(subscriptionId);
      toast.success('Your subscription has been canceled. You will have access until the end of your billing period.');
      // Refresh subscription data
      const subscriptionResponse = await subscriptionApi.getUserSubscriptions();
      setCurrentSubscription(subscriptionResponse[0] || null);
    } catch (error) {
      setError('Failed to cancel subscription');
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome back!
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
              <Users className="text-gray-400" size={20} />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              ↑ 12% from last month
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Sessions</h3>
              <Activity className="text-gray-400" size={20} />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">567</p>
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              ↑ 8% from last week
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
              <BarChart className="text-gray-400" size={20} />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">$12.4k</p>
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              ↑ 15% from last month
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 mr-3"></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      New user signed up
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 