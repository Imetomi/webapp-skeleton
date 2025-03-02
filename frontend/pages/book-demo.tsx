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
        {/* Header section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Book a Demo
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Schedule a personalized demo with our team to see how our authentication solution can work for your business.
              </p>
            </div>
          </div>
        </div>

        {/* Calendly widget section - full width, no constraints */}
        <div 
          className="calendly-inline-widget w-full bg-white"
          data-url="https://calendly.com/imetstamas-rfog/30min"
          style={{ height: '1000px' }}
        ></div>
      </Layout>
    </>
  );
};

export default BookDemoPage; 