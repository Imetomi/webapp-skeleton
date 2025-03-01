import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { Check } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pricing | WebApp</title>
        <meta name="description" content="Choose the right plan for your authentication needs" />
      </Head>

      <Layout>
        <div className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Simple, transparent pricing
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Choose the plan that's right for your business. All plans include a 14-day free trial.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Starter</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$29</span>
                    <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Perfect for small projects and startups</p>
                </div>
                <div className="flex-1 p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Up to 1,000 active users</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Social login providers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Basic analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Email support</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6">
                  <Link 
                    href="/auth/signin" 
                    className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-center text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:border-primary-800"
                  >
                    Start free trial
                  </Link>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border-2 border-primary-500 dark:border-accent-500 flex flex-col relative">
                <div className="absolute top-0 inset-x-0">
                  <div className="bg-primary-500 dark:bg-accent-500 text-white text-xs font-medium px-3 py-1 text-center rounded-b-md mx-auto w-32">
                    Most Popular
                  </div>
                </div>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pro</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$79</span>
                    <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">For growing businesses and applications</p>
                </div>
                <div className="flex-1 p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Up to 10,000 active users</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">All social login providers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Priority email support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Custom branding</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6">
                  <Link 
                    href="/auth/signin" 
                    className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-center text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:border-primary-800"
                  >
                    Start free trial
                  </Link>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Enterprise</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$199</span>
                    <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">For large-scale applications and businesses</p>
                </div>
                <div className="flex-1 p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Unlimited active users</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">All social login providers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Enterprise analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">24/7 phone & email support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Custom branding</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">Dedicated account manager</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6">
                  <Link 
                    href="/book-demo" 
                    className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-center text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:border-primary-800"
                  >
                    Contact sales
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-16 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently asked questions
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Can I cancel at any time?</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                    Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                  </p>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">How does the free trial work?</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                    All plans come with a 14-day free trial. No credit card required to start. You can upgrade to a paid plan at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PricingPage; 