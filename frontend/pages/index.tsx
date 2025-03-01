import React from 'react';
import { AuthStatus } from '../components/auth/AuthStatus';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Webapp Skeleton</h1>
          <AuthStatus />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Webapp Skeleton</h2>
              <p className="mb-4">
                A versatile web application skeleton with built-in features for authentication,
                payment processing, content management, and user handling.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <FeatureCard
                  title="Authentication"
                  description="User registration, login, and Google authentication"
                  icon="🔐"
                />
                <FeatureCard
                  title="Payment Processing"
                  description="Subscription management with Stripe"
                  icon="💳"
                />
                <FeatureCard
                  title="Content Management"
                  description="Blog and content features with Strapi CMS"
                  icon="📝"
                />
                <FeatureCard
                  title="User Management"
                  description="User profiles, roles, and permissions"
                  icon="👥"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};
