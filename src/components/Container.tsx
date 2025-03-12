
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 md:px-6", className)} id={id}>
      {children}
    </div>
  );
};
