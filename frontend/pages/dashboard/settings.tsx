import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();

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
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage; 