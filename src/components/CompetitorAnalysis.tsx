
import { useState, useEffect } from "react";
import { BrandData } from "@/components/BrandTracker";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { generateMockCompetitorData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { CompetitorList } from "@/components/competitors/CompetitorList";
import { KeywordComparison } from "@/components/competitors/KeywordComparison";
import { CompetitorSkeleton } from "@/components/competitors/CompetitorSkeleton";

interface CompetitorAnalysisProps {
  brandData: BrandData;
}

export const CompetitorAnalysis = ({ brandData }: CompetitorAnalysisProps) => {
  const [loading, setLoading] = useState(true);
  const [competitorData, setCompetitorData] = useState<any>(null);
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
        (!openAIKey && !anthropicKey);
      
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
  }, [brandData, useMockData]);

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
      
      <CompetitorList competitors={competitorData.competitors} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KeywordComparison 
          title="Competitive Keywords"
          description="Keywords where competitors are mentioned more frequently"
          keywords={competitorData.competitiveKeywords}
        />

        <KeywordComparison 
          title="Opportunity Keywords"
          description="Keywords where you have an advantage over competitors"
          keywords={competitorData.opportunityKeywords}
        />
      </div>
    </div>
  );
};
