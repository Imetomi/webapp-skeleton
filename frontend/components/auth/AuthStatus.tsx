import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';

export const AuthStatus: React.FC = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <div className="text-sm">Loading...</div>;
  }

  if (!user) {
    return (
      <Link 
        href="/login"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">
          {user.displayName || user.email}
        </span>
      </div>
      <button
        onClick={signOut}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Sign out
      </button>
    </div>
  );
}; 