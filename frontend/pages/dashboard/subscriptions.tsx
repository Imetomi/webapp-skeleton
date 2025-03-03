import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { subscriptionApi } from '../../utils/api';
import { SubscriptionPlan } from '../../types/subscription';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionsPage: React.FC = () => {
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

  const handleSubscribe = async (planId: number) => {
    try {
      const response = await subscriptionApi.createCheckoutSession(planId);
      if (response.checkout_url) {
        window.location.href = response.checkout_url;
      }
    } catch (error) {
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
      toast.error('Failed to cancel subscription. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Subscriptions
        </h1>

        {/* Current Subscription Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Current Subscription
            </h3>
          </div>
          <div className="p-6">
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
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        currentSubscription.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400'
                      }`}>
                        {currentSubscription.status === 'active' ? 'Active' : 'Canceled'}
                      </span>
                      {currentSubscription.cancel_at_period_end && (
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          (Cancels at period end)
                        </span>
                      )}
                    </p>
                    {!currentSubscription.cancel_at_period_end && currentSubscription.status === 'active' && (
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
                  disabled={currentSubscription?.plan_id === plan.id && currentSubscription?.status === 'active'}
                >
                  {currentSubscription?.plan_id === plan.id 
                    ? currentSubscription.status === 'active'
                      ? 'Current Plan'
                      : 'Reactivate'
                    : 'Subscribe'
                  }
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionsPage; 