
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BrandData } from "@/components/BrandTracker";
import { ComparisonHeader } from "@/components/comparison/ComparisonHeader";
import { LoadingState } from "@/components/comparison/LoadingState";
import { ErrorMessages } from "@/components/comparison/ErrorMessages";
import { EmptyState } from "@/components/comparison/EmptyState";
import { ComparisonResults } from "@/components/comparison/ComparisonResults";
import { getTraditionalSearchResults, TraditionalSearchResults } from "@/services/traditional-search";
import { toast } from "sonner";
import { analyzeSentiment, detectRecommendation } from "@/utils/sentimentAnalysis";

interface AIvsTraditionalComparisonProps {
  brandData: BrandData;
  aiResults: any;
}

export const AIvsTraditionalComparison = ({ brandData, aiResults }: AIvsTraditionalComparisonProps) => {
  const [selectedKeyword, setSelectedKeyword] = useState<string>(
    brandData.keywords.length > 0 ? brandData.keywords[0] : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState<TraditionalSearchResults | null>(null);
  const [apiLimitExceeded, setApiLimitExceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [useStaticData, setUseStaticData] = useState(true);

  useEffect(() => {
    if (brandData.keywords.length > 0) {
      setSelectedKeyword(brandData.keywords[0]);
    }
  }, [brandData.keywords]);

  // Find the AI result for the selected keyword
  const aiResult = aiResults?.results?.find(
    (result: any) => result.keyword === selectedKeyword
  );
  
  // Enhance the AI result with sentiment and recommendation analysis if found
  let enhancedAiResult = aiResult;
  if (aiResult && aiResult.response && brandData.name) {
    const sentiment = analyzeSentiment(aiResult.response, brandData.name);
    const recommendation = detectRecommendation(aiResult.response, brandData.name);
    
    enhancedAiResult = {
      ...aiResult,
      sentiment,
      recommendation
    };
  }

  const fetchTraditionalResults = async () => {
    setIsLoading(true);
    setApiLimitExceeded(false);
    setErrorMessage(null);
    
    try {
      console.log(`Starting ${useStaticData ? "static" : "live web search"} fetch for keyword:`, selectedKeyword);
      
      // Make sure to use the selected keyword as query
      const results = await getTraditionalSearchResults(selectedKeyword, brandData.name, useStaticData);
      console.log("Traditional search results:", results);
      
      if (results.error === "API_LIMIT_EXCEEDED" || results.error === "PROXY_ERROR") {
        console.log("API limit exceeded or proxy error");
        setApiLimitExceeded(true);
        setComparisonData(null);
        toast.error("Could not access search results. Try using static data instead.");
      } else {
        setComparisonData(results);
        
        if (results.topResults.length === 0) {
          toast.warning("No search results found. Try a different query or use static data.");
        } else {
          toast.success(`Found ${results.topResults.length} search results`);
        }
      }
    } catch (error) {
      console.error("Error fetching traditional search results:", error);
      setErrorMessage("Error fetching search results. Please check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <ComparisonHeader 
        selectedKeyword={selectedKeyword}
        keywords={brandData.keywords}
        onKeywordChange={setSelectedKeyword}
        onCompare={fetchTraditionalResults}
        isLoading={isLoading}
        hasAiResult={!!enhancedAiResult}
        useMockData={useStaticData}
        onToggleMockData={() => setUseStaticData(prev => !prev)}
      />
      
      <CardContent>
        <EmptyState 
          hasAiResult={!!enhancedAiResult} 
          hasComparisonData={!!comparisonData} 
        />

        {isLoading && <LoadingState retryWithSimpleQuery={false} />}

        <ErrorMessages 
          errorMessage={errorMessage} 
          apiLimitExceeded={apiLimitExceeded} 
        />

        <ComparisonResults 
          aiResult={enhancedAiResult} 
          comparisonData={comparisonData} 
          brandName={brandData.name}
        />
      </CardContent>
    </Card>
  );
};
