import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Secure Authentication for Modern Web Applications
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Seamlessly integrate authentication into your application with our powerful, 
            easy-to-use platform. Get started in minutes, not days.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/auth/login" 
              className="btn-primary flex items-center justify-center gap-2 text-lg"
            >
              Try it for free <ArrowRight size={18} />
            </Link>
            
            <Link 
              href="/docs" 
              className="btn-secondary text-lg"
            >
              Book a demo
            </Link>
          </div>
        </div>
        
        {/* Hero Image/Illustration Placeholder */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-80 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Application Screenshot/Illustration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 