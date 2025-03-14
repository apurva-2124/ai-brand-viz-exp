import React from "react";
import { Card } from "@/components/ui/card";
import { AIResponseAnalysis } from "@/components/visibility/AIResponseAnalysis";
import { AIvsTraditionalComparison } from "@/components/AIvsTraditionalComparison";
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

      {/* Move the results section below the controls */}
      {/* Removed separate AI Response Analysis section as it will be merged into the ComparisonResults */}
      {/* Removed separate AI Search Queries section as it will be merged into the AI Search Overview */}
      
      {/* AIvsTraditionalComparison component will handle all the sections as per the new layout */}
      {aiResults && (
        <AIvsTraditionalComparison
          brandData={{
            name: selectedBrand.brand,
            industry: selectedBrand.industry,
            keywords: [selectedKeyword],
            email: "",
            firstName: "",
            lastName: ""
          }}
          aiResults={aiResults}
        />
      )}
    </Card>
  );
};
