
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Loader2, Ban } from "lucide-react";
import { BrandData } from "@/components/BrandTracker";
import { ComparisonHeader } from "@/components/comparison/ComparisonHeader";
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";
import { getTraditionalSearchResults, TraditionalSearchResults } from "@/services/traditionalSearch";

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

  // Update selected keyword when brandData changes
  useEffect(() => {
    if (brandData.keywords.length > 0) {
      setSelectedKeyword(brandData.keywords[0]);
    }
  }, [brandData.keywords]);

  // Find the result for the selected keyword
  const aiResult = aiResults?.results?.find(
    (result: any) => result.keyword === selectedKeyword
  );

  const fetchTraditionalResults = async () => {
    setIsLoading(true);
    setApiLimitExceeded(false);
    
    try {
      // Use the same query that was used for AI results
      const query = aiResult?.query || `${selectedKeyword} ${brandData.industry}`;
      
      // Fetch traditional search results using our service
      const results = await getTraditionalSearchResults(query, brandData.name);
      
      // Check if API limit is exceeded
      if (results.error === "API_LIMIT_EXCEEDED") {
        setApiLimitExceeded(true);
        setComparisonData(null);
      } else {
        setComparisonData(results);
      }
    } catch (error) {
      console.error("Error fetching traditional search results:", error);
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

        {aiResult && !comparisonData && !isLoading && !apiLimitExceeded && (
          <div className="text-center py-8 text-muted-foreground">
            Select a keyword and click "Compare Results" to see the comparison
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            <p className="text-muted-foreground">Fetching traditional search results...</p>
          </div>
        )}

        {apiLimitExceeded && (
          <Alert variant="destructive" className="my-4">
            <Ban className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium">SerpApi limit exceeded</p>
              <p className="text-sm mt-1">
                The free SerpApi limit (100 searches/month) has been reached or the API key is invalid. 
                Please try again later or add your own SerpApi key in the settings.
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
