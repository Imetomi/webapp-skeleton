import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  container?: boolean;
  gradient?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  size = 'md',
  container = true,
  gradient = false,
}: SectionProps) => {
  return (
    <section
      className={cn(
        'relative',
        {
          'py-12': size === 'sm',
          'py-20': size === 'md',
          'py-32': size === 'lg',
          'bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800': gradient,
        },
        className
      )}
    >
      {container ? (
        <div className="container mx-auto px-4">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};

export default Section; 