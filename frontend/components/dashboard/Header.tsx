import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { User, Settings, Sun, Moon, LogOut, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ icon, label, onClick }) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          onClick={onClick}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/40 transition-colors"
        >
          {React.cloneElement(icon as React.ReactElement, {
            size: 20,
            className: 'flex-shrink-0'
          })}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-gray-900 text-white px-2 py-1 rounded text-sm"
          sideOffset={5}
        >
          {label}
          <Tooltip.Arrow className="fill-gray-900" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleSettingsClick = () => {
    router.push('/dashboard/settings');
  };

  return (
    <div className="h-16 px-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-end gap-2">
      <HeaderIcon
        icon={<User />}
        label="Profile"
        onClick={() => router.push('/dashboard/profile')}
      />
      <HeaderIcon
        icon={<Settings />}
        label="Settings"
        onClick={handleSettingsClick}
      />
      <HeaderIcon
        icon={theme === 'dark' ? <Sun /> : <Moon />}
        label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        onClick={toggleTheme}
      />
      <HeaderIcon
        icon={<HelpCircle />}
        label="Help"
        onClick={() => window.open('https://help.example.com', '_blank')}
      />
      <HeaderIcon
        icon={<LogOut />}
        label="Sign out"
        onClick={handleSignOut}
      />
    </div>
  );
};

export default Header; 