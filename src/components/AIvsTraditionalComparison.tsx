
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Loader2, Ban, AlertCircle } from "lucide-react";
import { BrandData } from "@/components/BrandTracker";
import { ComparisonHeader } from "@/components/comparison/ComparisonHeader";
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
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
        {!aiResult && (
          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please run an AI visibility analysis first to enable comparison.
            </AlertDescription>
          </Alert>
        )}

        {aiResult && !comparisonData && !isLoading && !apiLimitExceeded && !errorMessage && (
          <div className="text-center py-8 text-muted-foreground">
            Select a keyword and click "Compare Results" to see the comparison
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            <p className="text-muted-foreground">
              {retryWithSimpleQuery 
                ? "First attempt didn't return results. Trying with alternate query format..."
                : "Fetching traditional search results..."}
            </p>
          </div>
        )}

        {errorMessage && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {apiLimitExceeded && (
          <Alert variant="destructive" className="my-4">
            <Ban className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium">SerpApi key missing or limit exceeded</p>
              <p className="text-sm mt-1">
                {!localStorage.getItem("serpapi_api_key") 
                  ? "No SerpApi key found. Please add your SerpApi key in the settings." 
                  : "The free SerpApi limit (100 searches/month) has been reached or the API key is invalid."}
                Please try again later or add a valid SerpApi key in the settings.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {aiResult && comparisonData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <AIResults aiResult={aiResult} />
            <TraditionalResults comparisonData={comparisonData} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
