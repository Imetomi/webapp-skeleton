import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  description,
  align = 'center',
  className = '',
  size = 'md',
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        'max-w-4xl mx-auto mb-16',
        {
          'text-center': align === 'center',
          'text-left': align === 'left',
        },
        className
      )}
    >
      <h2
        className={cn('font-bold text-gray-900 dark:text-white mb-4', {
          'text-3xl': size === 'sm',
          'text-4xl md:text-5xl': size === 'md',
          'text-5xl md:text-6xl': size === 'lg',
        })}
      >
        {title}
      </h2>
      {description && (
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading; 