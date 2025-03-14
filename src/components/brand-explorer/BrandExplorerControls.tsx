
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { AIResponseAnalysis } from "@/components/visibility/AIResponseAnalysis";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

// Import our control components
import { IndustrySelect } from "@/components/brand-explorer/IndustrySelect";
import { BrandSelect } from "@/components/brand-explorer/BrandSelect";
import { AIModelSelect } from "@/components/brand-explorer/AIModelSelect";
import { QueryTypeSelect } from "@/components/brand-explorer/QueryTypeSelect";
import { KeywordSelector } from "@/components/brand-explorer/KeywordSelector";
import { AnalysisButton } from "@/components/brand-explorer/AnalysisButton";
import { AIProvider } from "@/services/ai/types";
import { QueryType } from "@/utils/queryTemplates";
import { ComparisonResults } from "@/components/comparison/ComparisonResults";
import { getTraditionalSearchResults } from "@/services/traditional-search";
import { toast } from "sonner";
import { EmptyState } from "@/components/comparison/EmptyState";

interface BrandExplorerControlsProps {
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  selectedBrand: any;
  handleBrandChange: (brand: string) => void;
  selectedKeyword: string;
  setSelectedKeyword: (keyword: string) => void;
  provider: AIProvider;
  setProvider: (provider: AIProvider) => void;
  queryType: QueryType;
  setQueryType: (type: QueryType) => void;
  isAnalyzing: boolean;
  hasApiKey: boolean;
  aiResults: any;
  runAIVisibilityAnalysis: () => void;
  queries: any[];
}

export const BrandExplorerControls = ({
  selectedIndustry,
  setSelectedIndustry,
  selectedBrand,
  handleBrandChange,
  selectedKeyword,
  setSelectedKeyword,
  provider,
  setProvider,
  queryType,
  setQueryType,
  isAnalyzing,
  hasApiKey,
  aiResults,
  runAIVisibilityAnalysis,
  queries
}: BrandExplorerControlsProps) => {
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [isLoadingComparison, setIsLoadingComparison] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch traditional search results when AI results are available
  useEffect(() => {
    const fetchTraditionalData = async () => {
      if (aiResults && aiResults.results && aiResults.results.length > 0 && selectedKeyword) {
        setIsLoadingComparison(true);
        setError(null);
        
        try {
          // Use static data for demonstration purposes
          const useStaticData = true;
          const results = await getTraditionalSearchResults(selectedKeyword, selectedBrand.brand, useStaticData);
          setComparisonData(results);
        } catch (err) {
          console.error("Error fetching traditional search results:", err);
          setError("Failed to load comparison data");
          toast.error("Could not load comparison data");
        } finally {
          setIsLoadingComparison(false);
        }
      }
    };
    
    fetchTraditionalData();
  }, [aiResults, selectedKeyword, selectedBrand.brand]);

  // Get the AI result for the current keyword
  const currentAiResult = aiResults?.results?.find(
    (result: any) => result.keyword === selectedKeyword
  );

  return (
    <Card className="p-6">
      {/* 1️⃣ Brand Explorer (Top Section) - Keep as Is */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <IndustrySelect 
          selectedIndustry={selectedIndustry} 
          setSelectedIndustry={setSelectedIndustry} 
        />

        <BrandSelect 
          selectedIndustry={selectedIndustry}
          selectedBrand={selectedBrand.brand}
          onBrandChange={handleBrandChange}
        />

        <AIModelSelect 
          provider={provider} 
          setProvider={setProvider} 
        />

        <QueryTypeSelect 
          queryType={queryType} 
          setQueryType={setQueryType} 
        />
      </div>
      
      <KeywordSelector 
        keywords={selectedBrand.keywords}
        selectedKeyword={selectedKeyword}
        setSelectedKeyword={setSelectedKeyword}
      />

      <div className="mb-6 flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1">
                <AnalysisButton 
                  isAnalyzing={isAnalyzing}
                  hasApiKey={hasApiKey}
                  onClick={runAIVisibilityAnalysis}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>AI-generated responses are pulled directly from public AI models. Results may be inaccurate or biased. This tool does not modify AI outputs.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Show empty state when there are no results */}
      {aiResults && !currentAiResult && (
        <EmptyState 
          hasAiResult={false} 
          hasComparisonData={false} 
        />
      )}

      {/* Show loading state when fetching comparison data */}
      {isLoadingComparison && (
        <div className="text-center py-8">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading comparison data...</p>
        </div>
      )}

      {/* Display results using ComparisonResults when all data is available */}
      {currentAiResult && comparisonData && !isLoadingComparison && (
        <ComparisonResults
          aiResult={currentAiResult}
          comparisonData={comparisonData}
          brandName={selectedBrand.brand}
        />
      )}

      {/* Show error message if there's an error */}
      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md">
          <p className="font-medium">Error loading results</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </Card>
  );
};
