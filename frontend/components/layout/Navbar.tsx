import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Sun, Moon } from 'lucide-react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const router = useRouter();
  
  return (
    <header className="w-full py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          WebApp
        </Link>
        
        {/* Navigation */}
        <NavigationMenu.Root className="relative">
          <NavigationMenu.List className="flex space-x-8">
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className={`text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 ${
                  router.pathname === '/pricing' ? 'font-medium text-primary-600 dark:text-primary-400' : ''
                }`}
                href="/pricing"
              >
                Pricing
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className={`text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 ${
                  router.pathname === '/blog' ? 'font-medium text-primary-600 dark:text-primary-400' : ''
                }`}
                href="/blog"
              >
                Blog
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className={`text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 ${
                  router.pathname === '/about' ? 'font-medium text-primary-600 dark:text-primary-400' : ''
                }`}
                href="/about"
              >
                About
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Get Started Button */}
          <Link 
            href="/auth/login" 
            className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 