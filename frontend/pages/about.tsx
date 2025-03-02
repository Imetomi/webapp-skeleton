import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { Check } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us | WebApp</title>
        <meta name="description" content="Learn more about our company and mission" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                About WebApp
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We're on a mission to make authentication simple, secure, and accessible for developers everywhere.
              </p>
            </div>

            {/* Our Story */}
            <div className="max-w-4xl mx-auto mb-20">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p>
                      WebApp was founded in 2023 by a team of developers who were frustrated with the complexity of implementing secure authentication in their projects. We believed there had to be a better way.
                    </p>
                    <p>
                      Our team set out to build an authentication solution that would be simple to implement, secure by default, and flexible enough to meet the needs of modern web applications. After months of development and testing, WebApp was born.
                    </p>
                    <p>
                      Today, WebApp is used by thousands of developers around the world to secure their applications and provide a seamless authentication experience for their users.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Values */}
            <div className="max-w-6xl mx-auto mb-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Security First</h3>
                  </div>
                  <div className="flex-1 p-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      We believe that security should never be an afterthought. That's why we build our products with security as the top priority.
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Developer Experience</h3>
                  </div>
                  <div className="flex-1 p-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      We're developers too, and we know that a great developer experience leads to better products. Our APIs are designed to be intuitive and easy to use.
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Customer Success</h3>
                  </div>
                  <div className="flex-1 p-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      Your success is our success. We're committed to providing the support and resources you need to build great products.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="max-w-6xl mx-auto mb-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Team</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center">
                      <svg className="w-20 h-20 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Team Member {i}</h3>
                      <p className="text-sm text-primary-600 dark:text-primary-400 mb-4">Co-Founder & {i === 1 ? 'CEO' : i === 2 ? 'CTO' : 'COO'}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        With over 10 years of experience in software development and security, our team members are passionate about building great products.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of developers who are already using WebApp to secure their applications.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link href="/auth/signin">
                    Start your free trial
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/book-demo">
                    Book a demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage; 