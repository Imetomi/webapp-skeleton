import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

const BookDemoPage: React.FC = () => {
  // Load Calendly script
  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
    script.setAttribute('async', 'true');
    head?.appendChild(script);

    return () => {
      // Clean up
      if (head?.contains(script)) {
        head.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Book a Demo | WebApp</title>
        <meta name="description" content="Schedule a demo with our team to learn more about our authentication solution" />
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Book a Demo
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Schedule a personalized demo with our team to see how our authentication solution can work for your business.
              </p>
            </div>

            {/* Calendly inline widget */}
            <div 
              className="calendly-inline-widget bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" 
              data-url="https://calendly.com/your-calendly-link"
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BookDemoPage; 