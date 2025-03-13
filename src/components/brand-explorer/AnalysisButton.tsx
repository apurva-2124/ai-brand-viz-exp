
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, Settings } from "lucide-react";
import { ApiSettings } from "@/components/ApiSettings";

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
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-red-500 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            API Key Required: Add your API key in settings
          </p>
          <ApiSettings />
        </div>
      )}
    </div>
  );
};
