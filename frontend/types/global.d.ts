// This file contains global type declarations for the project

// Declare modules for packages that don't have TypeScript definitions
declare module 'react' {
  import * as React from 'react';
  export = React;
}

declare module 'next/router' {
  export const useRouter: () => {
    route: string;
    pathname: string;
    query: Record<string, string | string[]>;
    asPath: string;
    push: (url: string, as?: string, options?: any) => Promise<boolean>;
    replace: (url: string, as?: string, options?: any) => Promise<boolean>;
    reload: () => void;
    back: () => void;
    prefetch: (url: string) => Promise<void>;
    beforePopState: (cb: (state: any) => boolean) => void;
    events: {
      on: (type: string, handler: (...evts: any[]) => void) => void;
      off: (type: string, handler: (...evts: any[]) => void) => void;
      emit: (type: string, ...evts: any[]) => void;
    };
    isFallback: boolean;
  };
}

declare module 'next/link' {
  import { ComponentType, ReactNode } from 'react';
  
  interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    className?: string;
    children: ReactNode;
  }
  
  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/head' {
  import { ComponentType, ReactNode } from 'react';
  
  interface HeadProps {
    children: ReactNode;
  }
  
  const Head: ComponentType<HeadProps>;
  export default Head;
}

declare module 'next/image' {
  import { ComponentType, ImgHTMLAttributes } from 'react';
  
  interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    loader?: (resolverProps: { src: string; width: number; quality?: number }) => string;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    priority?: boolean;
    loading?: 'eager' | 'lazy';
    quality?: number;
  }
  
  const Image: ComponentType<ImageProps>;
  export default Image;
}

declare module 'lucide-react' {
  import { ComponentType } from 'react';
  
  interface IconProps {
    size?: number | string;
    color?: string;
    stroke?: string | number;
    className?: string;
  }
  
  export const ArrowRight: ComponentType<IconProps>;
  export const Sun: ComponentType<IconProps>;
  export const Moon: ComponentType<IconProps>;
  export const Check: ComponentType<IconProps>;
}

declare module '@radix-ui/react-navigation-menu' {
  import { ComponentType, ReactNode } from 'react';
  
  interface NavigationMenuProps {
    children: ReactNode;
    className?: string;
  }
  
  export const Root: ComponentType<NavigationMenuProps>;
  export const List: ComponentType<{ className?: string; children: ReactNode }>;
  export const Item: ComponentType<{ className?: string; children: ReactNode }>;
  export const Link: ComponentType<{ className?: string; href?: string; children: ReactNode }>;
}

declare module '@radix-ui/react-dropdown-menu' {
  import { ComponentType, ReactNode } from 'react';
  
  interface DropdownMenuProps {
    children: ReactNode;
    className?: string;
  }
  
  export const Root: ComponentType<DropdownMenuProps>;
  export const Trigger: ComponentType<{ className?: string; children: ReactNode }>;
  export const Content: ComponentType<{ className?: string; children: ReactNode }>;
  export const Item: ComponentType<{ className?: string; children: ReactNode }>;
} 