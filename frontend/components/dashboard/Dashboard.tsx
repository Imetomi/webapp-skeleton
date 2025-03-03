import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import * as Tabs from '@radix-ui/react-tabs';
import { BarChart, Users, Settings, Bell, FileText, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PricingCard } from '../pricing/PricingCard';
import { subscriptionApi } from '../../utils/api';
import { SubscriptionPlan, SubscriptionStatus } from '../../types/subscription';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
        console.error('Error fetching data:', error);
        toast.error('Failed to load subscription data');
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
      console.error('Error creating checkout session:', error);
      toast.error('Failed to initiate subscription process. Please try again.');
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
      console.error('Error canceling subscription:', error);
      toast.error('Failed to cancel subscription. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.displayName || 'User'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Signout Button */}
      <div className="flex justify-end mb-4">
        <Button variant="text" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      {/* Dashboard Tabs */}
      <Tabs.Root defaultValue="overview" className="w-full">
        <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <Tabs.Trigger
            value="overview"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 border-b-2 border-transparent data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 dark:data-[state=active]:border-primary-400 dark:data-[state=active]:text-primary-400"
          >
            <div className="flex items-center gap-2">
              <BarChart size={16} />
              <span>Overview</span>
            </div>
          </Tabs.Trigger>
          
          <Tabs.Trigger
            value="plans"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 border-b-2 border-transparent data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 dark:data-[state=active]:border-primary-400 dark:data-[state=active]:text-primary-400"
          >
            <div className="flex items-center gap-2">
              <CreditCard size={16} />
              <span>Plans</span>
            </div>
          </Tabs.Trigger>
          
          <Tabs.Trigger
            value="users"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 border-b-2 border-transparent data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 dark:data-[state=active]:border-primary-400 dark:data-[state=active]:text-primary-400"
          >
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Users</span>
            </div>
          </Tabs.Trigger>
          
          <Tabs.Trigger
            value="reports"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 border-b-2 border-transparent data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 dark:data-[state=active]:border-primary-400 dark:data-[state=active]:text-primary-400"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span>Reports</span>
            </div>
          </Tabs.Trigger>
          
          <Tabs.Trigger
            value="notifications"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 border-b-2 border-transparent data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 dark:data-[state=active]:border-primary-400 dark:data-[state=active]:text-primary-400"
          >
            <div className="flex items-center gap-2">
              <Bell size={16} />
              <span>Notifications</span>
            </div>
          </Tabs.Trigger>
          
          <Tabs.Trigger
            value="settings"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 border-b-2 border-transparent data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 dark:data-[state=active]:border-primary-400 dark:data-[state=active]:text-primary-400"
          >
            <div className="flex items-center gap-2">
              <Settings size={16} />
              <span>Settings</span>
            </div>
          </Tabs.Trigger>
        </Tabs.List>

        {/* Overview Tab Content */}
        <Tabs.Content value="overview" className="outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center">
                <span>↑ 12%</span>
                <span className="ml-1">from last month</span>
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Sessions</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">567</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center">
                <span>↑ 8%</span>
                <span className="ml-1">from last week</span>
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Authentication Rate</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">98.2%</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center">
                <span>↑ 2%</span>
                <span className="ml-1">from last month</span>
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-accent-500 mr-3"></div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        User logged in from a new device
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
        </Tabs.Content>

        {/* Plans Tab Content */}
        <Tabs.Content value="plans" className="outline-none">
          {/* Current Subscription Status */}
          <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Current Subscription
            </h3>
            {currentSubscription && currentPlan ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Plan</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {currentPlan.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    ${(currentPlan.price / 100).toFixed(2)}/{currentPlan.interval}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Period</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {formatDate(currentSubscription.current_period_start)} - {formatDate(currentSubscription.current_period_end)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <div className="flex items-center justify-between">
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400">
                        Active
                      </span>
                      {currentSubscription.cancel_at_period_end && (
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          (Cancels at period end)
                        </span>
                      )}
                    </p>
                    {!currentSubscription.cancel_at_period_end && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancel(currentSubscription.id)}
                        className="ml-4"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  You don't have an active subscription yet.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Choose a plan below to get started with our premium features.
                </p>
              </div>
            )}
          </div>

          {/* Available Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-8">
                Loading plans...
              </div>
            ) : plans.length === 0 ? (
              <div className="col-span-3 text-center py-8">
                No subscription plans available.
              </div>
            ) : (
              plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {plan.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${(plan.price / 100).toFixed(2)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                  </div>
                  <Button
                    className="mt-6"
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={currentSubscription?.plan_id === plan.id}
                  >
                    {currentSubscription?.plan_id === plan.id ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </div>
              ))
            )}
          </div>
        </Tabs.Content>

        {/* Placeholder content for other tabs */}
        <Tabs.Content value="users" className="outline-none">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">User management content will go here.</p>
          </div>
        </Tabs.Content>
        
        <Tabs.Content value="reports" className="outline-none">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">Reports content will go here.</p>
          </div>
        </Tabs.Content>
        
        <Tabs.Content value="notifications" className="outline-none">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">Notifications content will go here.</p>
          </div>
        </Tabs.Content>
        
        <Tabs.Content value="settings" className="outline-none">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">Settings content will go here.</p>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default Dashboard; 