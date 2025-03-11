
import { cn } from '@/lib/utils';

interface ShimmerProps {
  className?: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
}

export function Shimmer({ className, children, width, height }: ShimmerProps) {
  return (
    <div
      className={cn(
        'animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]',
        className
      )}
      style={{ width, height }}
    >
      {children}
    </div>
  );
}
