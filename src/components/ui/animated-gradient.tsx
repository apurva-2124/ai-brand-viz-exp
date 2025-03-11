
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
}

export function AnimatedGradient({
  className,
  children,
  intensity = 'subtle',
  speed = 'medium',
  ...props
}: AnimatedGradientProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const intensityValues = {
    subtle: 'opacity-[0.15]',
    medium: 'opacity-[0.3]',
    high: 'opacity-[0.5]',
  };
  
  const speedValues = {
    slow: 'animate-[pulse_8s_ease-in-out_infinite]',
    medium: 'animate-[pulse_5s_ease-in-out_infinite]',
    fast: 'animate-[pulse_3s_ease-in-out_infinite]',
  };

  useEffect(() => {
    if (!ref.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = ref.current!.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      ref.current!.style.setProperty('--mouse-x', `${x}`);
      ref.current!.style.setProperty('--mouse-y', `${y}`);
    };
    
    const el = ref.current;
    el.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{
        '--mouse-x': '0.5',
        '--mouse-y': '0.5'
      } as React.CSSProperties}
      {...props}
    >
      <div 
        className={cn(
          'absolute inset-0 z-0 transition-opacity duration-500',
          intensityValues[intensity],
          speedValues[speed]
        )}
        style={{
          background: `radial-gradient(
            800px circle at 
            calc(var(--mouse-x) * 100%) 
            calc(var(--mouse-y) * 100%),
            rgba(var(--primary), 0.15),
            transparent 40%
          )`
        }}
      />
      {children}
    </div>
  );
}
