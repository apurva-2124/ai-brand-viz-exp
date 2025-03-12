
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
        Select a keyword and click "Compare Results" to see the comparison
      </div>
    );
  }
  
  return null;
};
