import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Sun, Moon } from 'lucide-react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/Button';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call handler right away to update state with initial scroll position
    handleScroll();
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header 
      style={{ height: '56px' }}
      className={`w-full fixed top-0 left-0 right-0 z-50 no-layout-shifts ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-800' 
          : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary-600 dark:text-accent-400">
          WebApp
        </Link>
        
        {/* Navigation and Actions - Aligned to the right */}
        <div className="flex items-center space-x-6">
          {/* Navigation */}
          <NavigationMenu.Root className="relative">
            <NavigationMenu.List className="flex space-x-6">
              <NavigationMenu.Item>
                <NavigationMenu.Link
                  className={`text-base text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-accent-400 ${
                    router.pathname === '/pricing' ? 'text-primary-600 dark:text-accent-400' : ''
                  }`}
                  href="/pricing"
                >
                  Pricing
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              
              <NavigationMenu.Item>
                <NavigationMenu.Link
                  className={`text-base text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-accent-400 ${
                    router.pathname === '/blog' ? 'text-primary-600 dark:text-accent-400' : ''
                  }`}
                  href="/blog"
                >
                  Blog
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              
              <NavigationMenu.Item>
                <NavigationMenu.Link
                  className={`text-base text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-accent-400 ${
                    router.pathname === '/about' ? 'text-primary-600 dark:text-accent-400' : ''
                  }`}
                  href="/about"
                >
                  About
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-accent-300 dark:hover:bg-gray-800"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* Get Started Button */}
          <Button asChild>
            <Link href="/auth/signin">
              Get started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 