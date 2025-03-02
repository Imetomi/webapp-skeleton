import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  // Base styles - making them more streamlined and elegant
  'font-medium rounded-md transition-colors text-center tracking-normal inline-flex items-center justify-center cursor-pointer w-fit',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 dark:text-white',
        secondary: 'bg-primary-100 text-primary-600 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-800/40',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/40',
        link: 'bg-transparent underline-offset-4 hover:underline text-primary-600 dark:text-primary-400 p-0 h-auto',
      },
      size: {
        default: 'text-sm px-4 py-2',
        sm: 'text-xs px-3 py-1.5',
        lg: 'text-base px-5 py-2',
        icon: 'p-2',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto'
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 