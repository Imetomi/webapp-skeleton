import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import Section from '../ui/Section';

const Hero: React.FC = () => {
  const router = useRouter();

  // Prefetch the routes immediately
  React.useEffect(() => {
    router.prefetch('/auth/signin');
    router.prefetch('/book-demo');
  }, [router]);

  return (
    <Section size="lg" gradient>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Secure{' '}
          <span className="relative inline-block">
            authentication
            <svg className="absolute -bottom-0 w-full" width="100%" height="12" viewBox="-5 0 530 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8C21 2.5 42 13.5 63 8C84 2.5 105 13.5 126 8C147 2.5 168 13.5 189 8C210 2.5 231 13.5 252 8C273 2.5 294 13.5 315 8C336 2.5 357 13.5 378 8C399 2.5 420 13.5 441 8C462 2.5 483 13.5 504 8C515 2.5 520 8 520 8" 
                    stroke="#f81ce5" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </span>{' '}
          for modern web apps
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto mt-10">
          Seamlessly integrate authentication into your application with our powerful, 
          easy-to-use platform. Get started in minutes, not days.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
          >
            <Link 
              href="/auth/signin" 
              prefetch
              scroll={false}
              className="inline-flex items-center gap-2 w-full justify-center"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                router.push('/auth/signin');
              }}
            >
              Try it for free <ArrowRight size={16} />
            </Link>
          </Button>
          
          <Button
            asChild
            variant="secondary"
            size="lg"
          >
            <Link 
              href="/book-demo" 
              prefetch
              scroll={false}
              className="w-full justify-center"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                router.push('/book-demo');
              }}
            >
              Book a demo
            </Link>
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-gray-500 dark:text-accent-200 flex items-center justify-center gap-6">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No credit card required
          </span>
        </div>

        {/* Hero Image/Illustration */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-xl h-80 flex items-center justify-center shadow-lg overflow-hidden">
            <p className="text-gray-500 dark:text-accent-300 text-lg">
              Application Screenshot/Illustration
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero; 