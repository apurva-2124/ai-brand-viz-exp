
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

interface AnalysisButtonProps {
  isAnalyzing: boolean;
  hasApiKey: boolean;
  onClick: () => void;
}

export const AnalysisButton = ({ isAnalyzing, hasApiKey, onClick }: AnalysisButtonProps) => {
  return (
    <div className="mb-6">
      <Button 
        onClick={onClick} 
        disabled={isAnalyzing || !hasApiKey}
        className="w-full"
      >
        {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isAnalyzing ? "Analyzing..." : "Analyze AI Search Results"}
      </Button>
      {!hasApiKey && (
        <p className="text-sm text-red-500 mt-2 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1" />
          API Key Required: Add your API key in settings to run an AI analysis and see results.
        </p>
      )}
    </div>
  );
};
