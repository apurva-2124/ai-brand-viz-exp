
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedGradient } from './animated-gradient';

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
  hover?: boolean;
  intensity?: 'subtle' | 'medium' | 'high';
  interactive?: boolean;
}

export const BlurCard = forwardRef<HTMLDivElement, BlurCardProps>(
  ({ className, children, gradient = false, hover = true, intensity = 'subtle', interactive = true, ...props }, ref) => {
    const Component = gradient ? AnimatedGradient : 'div';
    
    return (
      <Component
        ref={ref}
        className={cn(
          'relative rounded-2xl backdrop-blur-sm bg-white/80 border border-white/20',
          'card-shadow transition-all duration-300',
          hover && 'hover:shadow-lg',
          interactive && 'hover:scale-[1.01] active:scale-[0.99]',
          className
        )}
        intensity={intensity}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

BlurCard.displayName = 'BlurCard';
