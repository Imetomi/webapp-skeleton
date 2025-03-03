import React from 'react';
import { Home, FolderKanban, Settings, CreditCard, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '../../utils/cn';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label, isActive }) => (
  <Link 
    href={href}
    className={cn(
      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
      isActive 
        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/40'
    )}
  >
    {React.cloneElement(icon as React.ReactElement, {
      size: 18,
      className: cn(
        'flex-shrink-0',
        isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
      )
    })}
    <span>{label}</span>
  </Link>
);

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const menuItems = [
    { href: '/dashboard', icon: <Home />, label: 'Home' },
    { href: '/dashboard/projects', icon: <FolderKanban />, label: 'Projects' },
    { href: '/dashboard/settings', icon: <Settings />, label: 'Settings' },
    { href: '/dashboard/subscriptions', icon: <CreditCard />, label: 'Subscriptions' },
    { href: '/dashboard/invoices', icon: <FileText />, label: 'Invoices' },
  ];

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h2>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={currentPath === item.href}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 