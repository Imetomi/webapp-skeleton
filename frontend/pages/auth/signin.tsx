import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LoginButton } from '../../components/auth/LoginButton';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignInPage() {
  const { user, loading, signInWithEmailPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signInWithEmailPassword(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred during sign in');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | WebApp</title>
        <meta name="description" content="Sign in to your WebApp account" />
      </Head>

      <ToastContainer />

      <div className="min-h-screen flex flex-col">
        <div className="flex flex-1">
          {/* Left side - Sign in form */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="p-6">
              {/* Back to Home Link */}
              <div className="absolute top-8 left-8">
                <Link 
                  href="/"
                  className="inline-flex items-center text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to home
                </Link>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-8 pt-0">
              <div className="max-w-md w-full space-y-6">
                <div>
                  <Link href="/" className="text-xl font-bold text-primary-600 dark:text-accent-400">
                    WebApp
                  </Link>
                  <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                    Sign in to your account
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Or{' '}
                    <Link href="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500 dark:text-accent-400 dark:hover:text-accent-300">
                      create a new account
                    </Link>
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="email-address" className="sr-only">Email address</label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-accent-400 dark:hover:text-accent-300">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" fullWidth>
                      Sign in
                    </Button>
                  </div>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 w-full">
                      <LoginButton />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="hidden lg:block lg:w-1/2 bg-primary-100 dark:bg-gray-800">
            <div className="h-full w-full flex items-center justify-center p-8">
              <div className="relative w-full h-full max-w-lg rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Secure Authentication</h3>
                    <p className="text-white/80 max-w-xs mx-auto">
                      Protect your application with our state-of-the-art authentication system
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <img 
                    src="/images/auth-illustration.svg" 
                    alt="Authentication Illustration" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 