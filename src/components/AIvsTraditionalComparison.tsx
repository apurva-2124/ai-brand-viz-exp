
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BrandData } from "@/components/BrandTracker";
import { Info } from "lucide-react";

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

  // Get the AI result for the selected keyword
  const aiResult = aiResults?.results?.find(
    (result: any) => result.keyword === selectedKeyword
  );

  // Simulate fetching traditional search results
  const fetchTraditionalResults = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate mock data for traditional search
      const mockTraditionalResults = {
        searchEngine: "Google",
        query: aiResult?.query || `${selectedKeyword} ${brandData.industry}`,
        brandMentions: Math.floor(Math.random() * 5) + (aiResult?.isProminent ? 3 : 1),
        topResults: [
          {
            title: aiResult?.isProminent 
              ? `${brandData.name} - Leading ${selectedKeyword} in ${brandData.industry}`
              : `Top 10 ${selectedKeyword} Options for ${brandData.industry} Users`,
            snippet: aiResult?.isProminent
              ? `${brandData.name} offers the best ${selectedKeyword} solutions with industry-leading features and support.`
              : `Compare the best ${selectedKeyword} options including ${brandData.name} and alternatives.`,
            position: aiResult?.isProminent ? 1 : Math.floor(Math.random() * 5) + 2,
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
      <CardHeader>
        <CardTitle>AI vs. Traditional Search Comparison</CardTitle>
        <CardDescription>
          See how your brand appears in AI-powered search responses compared to traditional search engines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <Select 
              value={selectedKeyword} 
              onValueChange={setSelectedKeyword}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a keyword" />
              </SelectTrigger>
              <SelectContent>
                {brandData.keywords.map((keyword) => (
                  <SelectItem key={keyword} value={keyword}>
                    {keyword}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={fetchTraditionalResults} 
            disabled={isLoading || !aiResult}
            className="whitespace-nowrap"
          >
            {isLoading ? "Loading..." : "Compare Results"}
          </Button>
        </div>

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
          <Tabs defaultValue="side-by-side" className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="side-by-side">Side-by-Side View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="side-by-side">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AI Search Results */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">AI Search Results</h3>
                  <div className="text-sm mb-2">
                    <span className="text-muted-foreground">Query:</span> {aiResult.query}
                  </div>
                  <div className="text-sm mb-4">
                    <span className="text-muted-foreground">Provider:</span> {aiResult.provider}
                  </div>
                  <div className={`text-sm px-2 py-1 rounded inline-flex mb-4 ${
                    aiResult.isProminent 
                      ? "bg-green-100 text-green-800" 
                      : aiResult.hasBrandMention 
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}>
                    {aiResult.isProminent 
                      ? "Prominently Featured" 
                      : aiResult.hasBrandMention 
                        ? "Mentioned" 
                        : "Not Found"}
                  </div>
                  <div className="bg-secondary/30 p-3 rounded text-sm max-h-80 overflow-y-auto">
                    {aiResult.response}
                  </div>
                </div>

                {/* Traditional Search Results */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Traditional Search Results</h3>
                  <div className="text-sm mb-2">
                    <span className="text-muted-foreground">Search Engine:</span> {comparisonData.searchEngine}
                  </div>
                  <div className="text-sm mb-2">
                    <span className="text-muted-foreground">Query:</span> {comparisonData.query}
                  </div>
                  <div className="text-sm mb-4">
                    <span className="text-muted-foreground">Brand Mentions:</span> {comparisonData.brandMentions} times
                  </div>
                  
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {comparisonData.topResults.map((result: any, index: number) => (
                      <div key={index} className={`p-3 rounded text-sm ${result.hasBrandMention ? 'bg-secondary/30' : 'bg-secondary/10'}`}>
                        <div className="font-medium mb-1">
                          {result.title}
                          {result.hasBrandMention && (
                            <span className="text-xs ml-2 text-green-600">• Brand Mentioned</span>
                          )}
                        </div>
                        <div className="text-muted-foreground text-xs mb-1">Position: #{result.position}</div>
                        <div>{result.snippet}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Brand Prominence Comparison</h3>
                    <div className="flex items-center justify-around mt-6 text-center">
                      <div className="flex flex-col items-center">
                        <div className="text-xl font-bold mb-2">
                          {aiResult.isProminent ? "High" : aiResult.hasBrandMention ? "Medium" : "Low"}
                        </div>
                        <div className="text-sm text-muted-foreground">AI Search</div>
                      </div>
                      <div className="h-12 border-r border-gray-200"></div>
                      <div className="flex flex-col items-center">
                        <div className="text-xl font-bold mb-2">
                          {comparisonData.brandMentions >= 3 ? "High" : comparisonData.brandMentions >= 1 ? "Medium" : "Low"}
                        </div>
                        <div className="text-sm text-muted-foreground">Traditional Search</div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Insights</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>
                        Your brand is {aiResult.isProminent ? "prominently featured" : aiResult.hasBrandMention ? "mentioned" : "not found"} 
                        in AI responses for this keyword
                      </li>
                      <li>
                        Traditional search results {comparisonData.brandMentions > 0 ? "include" : "don't include"} your brand 
                        {comparisonData.brandMentions > 0 ? ` with ${comparisonData.brandMentions} mentions` : ""}
                      </li>
                      <li>
                        {aiResult.isProminent && comparisonData.brandMentions >= 3 
                          ? "Your brand has strong visibility across both search types" 
                          : !aiResult.hasBrandMention && comparisonData.brandMentions === 0
                            ? "Your brand needs visibility improvement in both AI and traditional search" 
                            : "There's a visibility gap between AI and traditional search results"}
                      </li>
                    </ul>
                  </div>
                </div>

                <Alert variant="info">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Note: Traditional search results are simulated for demonstration purposes. 
                    For accurate results, consider integrating with actual search APIs.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};
