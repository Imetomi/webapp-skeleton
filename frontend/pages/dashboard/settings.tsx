import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import * as Dialog from '@radix-ui/react-dialog';
import { userApi } from '../../utils/api';
import { subscriptionApi } from '../../utils/api';
import { Subscription } from '../../types/subscription';
import { useRouter } from 'next/router';

const SettingsPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = React.useState(false);

  React.useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const subscriptions = await subscriptionApi.getUserSubscriptions();
        setHasActiveSubscription(subscriptions.some(sub => sub.status === 'active'));
      } catch (error) {
        console.error('Failed to fetch subscription status:', error);
      }
    };

    checkSubscriptionStatus();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      await userApi.deleteAccount();
      await signOut();
      router.push('/');
    } catch (error: any) {
      console.error('Failed to delete account:', error?.response?.data?.detail || error);
      // You might want to show an error toast here
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Settings
        </h1>

        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Settings</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Display Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                defaultValue={user?.displayName || ''}
              />
            </div>
            <div>
              <Button>
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Settings</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="email_notifications"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="email_notifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email notifications about account activity.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="marketing_emails"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="marketing_emails" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Marketing Emails
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive updates about new features and promotions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h3>
          </div>
          <div className="p-6 space-y-4">
            <Button variant="secondary">
              Change Password
            </Button>
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Two-Factor Authentication
              </h4>
              <Button variant="secondary">
                Enable 2FA
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-900">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-500">Danger Zone</h3>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              {hasActiveSubscription ? (
                <p className="text-sm text-red-500">
                  You cannot delete your account while you have an active subscription. Please cancel your subscription first.
                </p>
              ) : (
                <Dialog.Root open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <Dialog.Trigger asChild>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                      Delete Account
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 w-[90vw] max-w-md">
                      <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Delete Account
                      </Dialog.Title>
                      <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Are you sure you want to delete your account? This action cannot be undone.
                      </Dialog.Description>
                      <div className="flex justify-end space-x-4">
                        <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={handleDeleteAccount}
                        >
                          Yes, Delete Account
                        </Button>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage; 