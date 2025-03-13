
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

  const aiResult = aiResults?.results?.find(
    (result: any) => result.keyword === selectedKeyword
  );

  const fetchTraditionalResults = async () => {
    setIsLoading(true);
    setApiLimitExceeded(false);
    setErrorMessage(null);
    
    try {
      console.log(`Starting ${useStaticData ? "static" : "live web search"} fetch for keyword:`, selectedKeyword);
      
      // Use the keyword as query
      const query = selectedKeyword;
      console.log("Fetching traditional results with query:", query);
      
      // Client-side fetch of results (with optional static data)
      const results = await getTraditionalSearchResults(query, brandData.name, useStaticData);
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
        hasAiResult={!!aiResult}
        useMockData={useStaticData}
        onToggleMockData={() => setUseStaticData(prev => !prev)}
      />
      
      <CardContent>
        <EmptyState 
          hasAiResult={!!aiResult} 
          hasComparisonData={!!comparisonData} 
        />

        {isLoading && <LoadingState retryWithSimpleQuery={false} />}

        <ErrorMessages 
          errorMessage={errorMessage} 
          apiLimitExceeded={apiLimitExceeded} 
        />

        <ComparisonResults 
          aiResult={aiResult} 
          comparisonData={comparisonData} 
        />
      </CardContent>
    </Card>
  );
};
