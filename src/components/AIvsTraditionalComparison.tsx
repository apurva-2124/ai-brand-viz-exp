
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { BrandData } from "@/components/BrandTracker";
import { ComparisonHeader } from "@/components/comparison/ComparisonHeader";
import { AIResults } from "@/components/comparison/AIResults";
import { TraditionalResults } from "@/components/comparison/TraditionalResults";

interface AIvsTraditionalComparisonProps {
  brandData: BrandData;
  aiResults: any;
}

export const AIvsTraditionalComparison = ({ brandData, aiResults }: AIvsTraditionalComparisonProps) => {
  const [selectedKeyword, setSelectedKeyword] = useState<string>(
    brandData.keywords.length > 0 ? brandData.keywords[0] : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState<any>(null);

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

  const fetchTraditionalResults = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockTraditionalResults = {
        searchEngine: "Google",
        query: aiResult?.query || `${selectedKeyword} ${brandData.industry}`,
        brandMentions: Math.floor(Math.random() * 5) + (aiResult?.isProminent ? 3 : 1),
        topResults: [
          {
            title: aiResult?.hasBrandMention 
              ? `${brandData.name} - Leading ${selectedKeyword} in ${brandData.industry}`
              : `Top 10 ${selectedKeyword} Options for ${brandData.industry} Users`,
            snippet: aiResult?.hasBrandMention
              ? `${brandData.name} offers the best ${selectedKeyword} solutions with industry-leading features and support.`
              : `Compare the best ${selectedKeyword} options including ${brandData.name} and alternatives.`,
            position: aiResult?.hasBrandMention ? 1 : Math.floor(Math.random() * 5) + 2,
            hasBrandMention: true
          },
          {
            title: `${selectedKeyword} - Complete Guide (${new Date().getFullYear()})`,
            snippet: `Everything you need to know about ${selectedKeyword} in the ${brandData.industry} industry.`,
            position: 2,
            hasBrandMention: Math.random() > 0.5
          },
          {
            title: `Best ${selectedKeyword} Solutions Compared`,
            snippet: `Expert comparison of top ${selectedKeyword} providers in the market.`,
            position: 3,
            hasBrandMention: Math.random() > 0.7
          }
        ]
      };
      
      setComparisonData(mockTraditionalResults);
      setIsLoading(false);
    }, 1500);
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

        {aiResult && !comparisonData && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            Select a keyword and click "Compare Results" to see the comparison
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8 animate-pulse">
            <p className="text-muted-foreground">Fetching traditional search results...</p>
          </div>
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
