import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Dashboard from '../../components/dashboard/Dashboard';
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Show dashboard if authenticated
  if (user) {
    return (
      <>
        <Head>
          <title>Dashboard | WebApp</title>
          <meta name="description" content="Manage your authentication settings and monitor your application." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Dashboard />
      </>
    );
  }

  // Return null while redirecting
  return null;
};

export default DashboardPage; 