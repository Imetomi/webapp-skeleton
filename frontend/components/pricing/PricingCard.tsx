import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
  variant?: 'default' | 'secondary';
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  popular = false,
  ctaText,
  ctaLink,
  variant = 'default',
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col',
        {
          'border border-gray-200 dark:border-gray-700': variant === 'default',
          'border-2 border-primary-500 dark:border-accent-500 shadow-xl relative': popular,
        }
      )}
    >
      {popular && (
        <div className="absolute top-0 inset-x-0">
          <div className="bg-primary-500 dark:bg-accent-500 text-white text-xs font-medium px-3 py-1 text-center rounded-b-md mx-auto w-32">
            Most Popular
          </div>
        </div>
      )}

      <div className={cn('p-6 border-b border-gray-200 dark:border-gray-700', {
        'mt-6': popular
      })}>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{price}</span>
          <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">/month</span>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <div className="flex-1 p-6">
        <ul className="space-y-4">
          {features.map((feature: PricingFeature, index: number) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-accent-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600 dark:text-gray-300">{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6">
        <Button
          asChild
          fullWidth
          variant={popular ? 'primary' : 'secondary'}
        >
          <Link href={ctaLink}>
            {ctaText}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PricingCard; 