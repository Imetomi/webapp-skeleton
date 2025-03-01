import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Head>
        <title>Webapp Skeleton</title>
        <meta name="description" content="A versatile web application skeleton" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Webapp Skeleton</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A versatile web application skeleton with built-in features for authentication, 
              payment processing, content management, and user handling.
            </p>
          </header>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Features</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-primary-800 mb-2">Authentication</h3>
                  <p className="text-primary-700">User registration, login, and Google authentication</p>
                </div>
                
                <div className="bg-accent-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-accent-800 mb-2">Payment Processing</h3>
                  <p className="text-accent-700">Subscription management with Stripe</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-green-800 mb-2">Content Management</h3>
                  <p className="text-green-700">Blog and content features with Strapi CMS</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-yellow-800 mb-2">User Management</h3>
                  <p className="text-yellow-700">User profiles, roles, and permissions</p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <button
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
                >
                  {isLoggedIn ? 'Log Out' : 'Try it Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
