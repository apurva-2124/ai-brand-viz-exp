
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

interface RecommendationHeaderProps {
  useMockData: boolean;
  setUseMockData: (useMock: boolean) => void;
  refreshData: () => void;
  handleExport: () => void;
  loading: boolean;
}

export const RecommendationHeader = ({ 
  useMockData, 
  setUseMockData, 
  refreshData, 
  handleExport,
  loading 
}: RecommendationHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Actionable Recommendations</h2>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setUseMockData(!useMockData)}
        >
          {useMockData ? "Use Real Data" : "Use Mock Data"}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={refreshData}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
};
