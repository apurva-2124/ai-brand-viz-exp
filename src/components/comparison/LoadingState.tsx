
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  retryWithSimpleQuery: boolean;
}

export const LoadingState = ({ retryWithSimpleQuery }: LoadingStateProps) => {
  return (
    <div className="text-center py-8">
      <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
      <p className="text-muted-foreground">
        {retryWithSimpleQuery 
          ? "First attempt didn't return results. Trying with alternate query format..."
          : "Fetching traditional search results..."}
      </p>
    </div>
  );
};
