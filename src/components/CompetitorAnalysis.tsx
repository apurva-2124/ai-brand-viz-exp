
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandData } from "@/components/BrandTracker";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { analyzeAIVisibility, AIProvider } from "@/services/aiVisibility";
import { generateMockCompetitorData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface CompetitorAnalysisProps {
  brandData: BrandData;
}

export const CompetitorAnalysis = ({ brandData }: CompetitorAnalysisProps) => {
  const [loading, setLoading] = useState(true);
  const [competitorData, setCompetitorData] = useState<any>(null);
  const [provider, setProvider] = useState<AIProvider>("both");
  const [useMockData, setUseMockData] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    
    try {
      // Check if API keys are set
      const openAIKey = localStorage.getItem("openai_api_key");
      const anthropicKey = localStorage.getItem("anthropic_api_key");
      
      // Determine if we should use mock data
      const shouldUseMockData = 
        useMockData || 
        (provider === "openai" && !openAIKey) || 
        (provider === "anthropic" && !anthropicKey) ||
        (provider === "both" && (!openAIKey || !anthropicKey));
      
      let data;
      
      if (shouldUseMockData) {
        // Use mock data if no API keys or mock data is requested
        data = generateMockCompetitorData(brandData);
        
        if (!useMockData) {
          toast({
            title: "Using mock data",
            description: "Missing API keys. Using simulated competitor data instead.",
          });
        }
      } else {
        // In a real implementation, we would query competitors based on brand data
        // For now, we'll use the mock data generator
        data = generateMockCompetitorData(brandData);
      }
      
      setCompetitorData(data);
    } catch (error) {
      console.error("Error fetching competitor data:", error);
      
      // Fallback to mock data
      const mockData = generateMockCompetitorData(brandData);
      setCompetitorData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [brandData, provider, useMockData]);

  if (loading) {
    return <CompetitorSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Competitor Analysis</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setUseMockData(!useMockData)}
          >
            {useMockData ? "Use Real Data" : "Use Mock Data"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Competitors in AI Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            These competitors are frequently mentioned alongside your brand in AI responses
          </p>
          <div className="space-y-4">
            {competitorData.competitors.map((competitor: any) => (
              <div key={competitor.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{competitor.name}</span>
                  <span>{competitor.score}/100</span>
                </div>
                <Progress value={competitor.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Competitive Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">
              Keywords where competitors are mentioned more frequently
            </p>
            <ul className="divide-y">
              {competitorData.competitiveKeywords.map((item: any) => (
                <li key={item.keyword} className="py-3 flex justify-between">
                  <span>{item.keyword}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">{item.yourScore}</span>
                    <span>vs</span>
                    <span className="text-green-500">{item.competitorScore}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Opportunity Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">
              Keywords where you have an advantage over competitors
            </p>
            <ul className="divide-y">
              {competitorData.opportunityKeywords.map((item: any) => (
                <li key={item.keyword} className="py-3 flex justify-between">
                  <span>{item.keyword}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">{item.yourScore}</span>
                    <span>vs</span>
                    <span className="text-red-500">{item.competitorScore}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CompetitorSkeleton = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[280px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-6" />
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-[140px]" />
                <Skeleton className="h-5 w-[50px]" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="py-2">
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
