
import { Button } from "@/components/ui/button";
import { RefreshCw, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIProvider } from "@/services/aiVisibility";
import { QueryType } from "@/utils/queryTransformer";

const QUERY_TYPES: { value: QueryType; label: string }[] = [
  { value: "best-in-class", label: "Best-in-Class (Category-Level)" },
  { value: "feature-specific", label: "Feature-Specific" },
  { value: "comparison", label: "Comparison Query" },
  { value: "review-based", label: "Review-Based Query" },
  { value: "transactional", label: "Transactional Intent" },
  { value: "ai-summarized", label: "AI Summarized Answer Query" },
  { value: "localized", label: "Localized Query (Location-Based)" },
  { value: "ai-assistant", label: "AI Assistant Query (Conversational Search)" },
  { value: "negative-sentiment", label: "Negative Sentiment Query (Reputation Risk)" },
  { value: "industry-trend", label: "Industry Trend Query (Thought Leadership)" },
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
          See how your brand appears in AI responses
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
        
        {!useMockData && (
          <div className="flex space-x-1">
            <Button 
              variant={provider === "openai" ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setProvider("openai")}
            >
              OpenAI
            </Button>
            <Button 
              variant={provider === "anthropic" ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setProvider("anthropic")}
            >
              Anthropic
            </Button>
            <Button 
              variant={provider === "gemini" ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setProvider("gemini")}
            >
              Gemini
            </Button>
            <Button 
              variant={provider === "all" ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setProvider("all")}
            >
              All
            </Button>
          </div>
        )}
        
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
