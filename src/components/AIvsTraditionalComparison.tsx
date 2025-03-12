
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BrandData } from "@/components/BrandTracker";
import { ComparisonHeader } from "@/components/comparison/ComparisonHeader";
import { LoadingState } from "@/components/comparison/LoadingState";
import { ErrorMessages } from "@/components/comparison/ErrorMessages";
import { EmptyState } from "@/components/comparison/EmptyState";
import { ComparisonResults } from "@/components/comparison/ComparisonResults";
import { getTraditionalSearchResults, TraditionalSearchResults } from "@/services/traditional-search";

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
  const [retryWithSimpleQuery, setRetryWithSimpleQuery] = useState(false);

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
    setRetryWithSimpleQuery(false);
    
    try {
      console.log("Checking for SerpAPI key:", localStorage.getItem("serpapi_api_key") ? "Present" : "Missing");
      
      if (!localStorage.getItem("serpapi_api_key")) {
        setApiLimitExceeded(true);
        setIsLoading(false);
        return;
      }
      
      // Try with a simplified query first - just the keyword
      let query = selectedKeyword;
      console.log("Fetching traditional results with simple query:", query);
      console.log("Brand name:", brandData.name);
      
      let results = await getTraditionalSearchResults(query, brandData.name);
      console.log("Traditional search results:", results);
      
      // If simple query returned no results, try with AI-generated query or more complex format
      if (results.topResults.length === 0 && !retryWithSimpleQuery) {
        console.log("No results with simple query, trying with more complex query");
        setRetryWithSimpleQuery(true);
        
        // Try to use the AI-generated query or fallback to a format with industry
        query = aiResult?.query || `${selectedKeyword} ${brandData.industry}`;
        console.log("Retrying with more complex query:", query);
        
        results = await getTraditionalSearchResults(query, brandData.name);
        console.log("Traditional search results (complex query):", results);
      }
      
      if (results.error === "API_LIMIT_EXCEEDED") {
        console.log("API limit exceeded or key missing");
        setApiLimitExceeded(true);
        setComparisonData(null);
      } else {
        setComparisonData(results);
      }
    } catch (error) {
      console.error("Error fetching traditional search results:", error);
      setErrorMessage("Error fetching search results. Please try again later.");
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
      />
      
      <CardContent>
        <EmptyState 
          hasAiResult={!!aiResult} 
          hasComparisonData={!!comparisonData} 
        />

        {isLoading && <LoadingState retryWithSimpleQuery={retryWithSimpleQuery} />}

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
