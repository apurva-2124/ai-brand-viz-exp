
import { Button } from "@/components/ui/button";
import { RefreshCw, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIProvider } from "@/services/aiVisibility";
import { QueryType } from "@/utils/queryTemplates";

const QUERY_TYPES: { value: QueryType; label: string }[] = [
  { value: "general", label: "General Query (Baseline)" },
  { value: "comparison", label: "Comparison Query" },
  { value: "negative-sentiment", label: "Negative Sentiment Query (Reputation Risk)" },
  { value: "review-based", label: "Review-Based Query" },
  { value: "ai-assistant", label: "AI Assistant Query (Conversational Search)" },
];

interface DashboardHeaderProps {
  loading: boolean;
  provider: AIProvider;
  setProvider: (provider: AIProvider) => void;
  queryType: QueryType;
  setQueryType: (type: QueryType) => void;
  useMockData: boolean;
  setUseMockData: (useMock: boolean) => void;
  fetchData: () => void;
  handleExportCSV: () => void;
  visibilityData: any;
}

export const DashboardHeader = ({
  loading,
  provider,
  setProvider,
  queryType,
  setQueryType,
  useMockData,
  setUseMockData,
  fetchData,
  handleExportCSV,
  visibilityData
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-xl font-semibold">AI Visibility Results</h2>
        <p className="text-sm text-muted-foreground">
          Compare AI-generated search results vs. traditional search results. Find out whether AI models mention your brand and how they describe it.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Select 
          value={queryType} 
          onValueChange={(value) => setQueryType(value as QueryType)}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select query type" />
          </SelectTrigger>
          <SelectContent>
            {QUERY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex space-x-1">
          <Button 
            variant="secondary" 
            size="sm"
            disabled={true}
          >
            OpenAI (GPT-4)
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setUseMockData(!useMockData)}
        >
          {useMockData ? "Use Real Data" : "Use Saved Results"}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={fetchData}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleExportCSV}
          disabled={!visibilityData}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
    </div>
  );
};
