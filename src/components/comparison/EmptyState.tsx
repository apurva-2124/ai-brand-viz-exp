
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmptyStateProps {
  hasAiResult: boolean;
  hasComparisonData: boolean;
}

export const EmptyState = ({ hasAiResult, hasComparisonData }: EmptyStateProps) => {
  if (hasAiResult && hasComparisonData) return null;
  
  if (!hasAiResult) {
    return (
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Please run an AI visibility analysis first to enable comparison.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (!hasComparisonData) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Select a keyword and click "Compare Results" to see the comparison</p>
        <p className="text-xs mt-2">Ensure you have added a valid SerpAPI key in settings to retrieve search results</p>
      </div>
    );
  }
  
  return null;
};
