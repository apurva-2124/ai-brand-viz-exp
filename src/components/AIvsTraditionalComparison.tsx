
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
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

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
    setDebugInfo(null);
    
    try {
      console.log("Starting SerpAPI fetch for keyword:", selectedKeyword);
      console.log("Checking for SerpAPI key:", localStorage.getItem("serpapi_api_key") ? "Present" : "Missing");
      
      if (!localStorage.getItem("serpapi_api_key")) {
        setApiLimitExceeded(true);
        setIsLoading(false);
        toast.error("SerpAPI key missing. Please add your API key in settings.");
        return;
      }
      
      // Try with a simplified query first - just the keyword
      let query = selectedKeyword;
      console.log("Fetching traditional results with simple query:", query);
      console.log("Brand name:", brandData.name);
      
      let results = await getTraditionalSearchResults(query, brandData.name);
      console.log("Traditional search results:", results);
      
      // Verify if results came back empty
      if (results.topResults.length === 0) {
        console.log("No results with keyword query, trying with brand name...");
        setDebugInfo(`No results found for "${query}". Trying with brand name...`);
        
        // Try with just the brand name
        query = brandData.name;
        results = await getTraditionalSearchResults(query, brandData.name);
        console.log("Brand name search results:", results);
        
        // If still empty, try with AI-generated query
        if (results.topResults.length === 0 && aiResult?.query) {
          console.log("No results with brand name, trying with AI query...");
          setDebugInfo(`No results found for "${query}". Trying with AI-generated query...`);
          
          query = aiResult.query;
          results = await getTraditionalSearchResults(query, brandData.name);
          console.log("AI query search results:", results);
        }
      }
      
      if (results.error === "API_LIMIT_EXCEEDED") {
        console.log("API limit exceeded or key missing");
        setApiLimitExceeded(true);
        setComparisonData(null);
      } else {
        setComparisonData(results);
        
        if (results.topResults.length === 0) {
          setDebugInfo(`No results found. Tried queries: "${selectedKeyword}", "${brandData.name}", and AI query if available. Check console for details.`);
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
      />
      
      <CardContent>
        <EmptyState 
          hasAiResult={!!aiResult} 
          hasComparisonData={!!comparisonData} 
        />

        {isLoading && <LoadingState retryWithSimpleQuery={false} />}

        {debugInfo && !isLoading && (
          <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded text-sm">
            <p className="font-medium">Debug Info:</p>
            <p>{debugInfo}</p>
          </div>
        )}

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
