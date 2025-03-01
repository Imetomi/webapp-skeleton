import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import * as Tabs from '@radix-ui/react-tabs';
import { BarChart, Users, Settings, Bell, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

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
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 mr-3"></div>
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