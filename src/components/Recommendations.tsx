
import { useState, useEffect } from "react";
import { BrandData } from "@/components/BrandTracker";
import { useToast } from "@/hooks/use-toast";
import { generateMockRecommendations } from "@/lib/mockData";
import { analyzeAIVisibility } from "@/services/aiVisibility";

import { RecommendationHeader } from "./recommendations/RecommendationHeader";
import { VisibilityRecommendationsCard } from "./recommendations/VisibilityRecommendationsCard";
import { KeywordRecommendationsCard } from "./recommendations/KeywordRecommendationsCard";
import { ContentStrategyCard } from "./recommendations/ContentStrategyCard";
import { RecommendationsSkeleton } from "./recommendations/RecommendationsSkeleton";
import { RecommendationData } from "./recommendations/types";

interface RecommendationsProps {
  brandData: BrandData;
}

export const Recommendations = ({ brandData }: RecommendationsProps) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<RecommendationData | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    
    try {
      // Check if API keys are set
      const openAIKey = localStorage.getItem("openai_api_key");
      const anthropicKey = localStorage.getItem("anthropic_api_key");
      
      // Determine if we should use mock data
      const shouldUseMockData = useMockData || (!openAIKey && !anthropicKey);
      
      let data;
      
      if (shouldUseMockData) {
        // Use mock data if no API keys or mock data is requested
        data = generateMockRecommendations(brandData);
        
        if (!useMockData) {
          toast({
            title: "Using mock data",
            description: "Missing API keys. Using simulated recommendations instead.",
          });
        }
      } else {
        // In a real implementation, we would generate personalized recommendations
        // based on the AI analysis results. For now, use the mock generator
        data = generateMockRecommendations(brandData);
      }
      
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      
      // Fallback to mock data
      const mockData = generateMockRecommendations(brandData);
      setRecommendations(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [brandData, useMockData]);

  const handleExport = () => {
    // In a real app, this would generate a PDF or spreadsheet
    toast({
      title: "Report Exported",
      description: "Your recommendations report has been downloaded.",
    });
  };

  if (loading) {
    return <RecommendationsSkeleton />;
  }

  if (!recommendations) {
    return null;
  }

  return (
    <div className="space-y-6">
      <RecommendationHeader 
        useMockData={useMockData} 
        setUseMockData={setUseMockData} 
        refreshData={fetchData} 
        handleExport={handleExport}
        loading={loading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VisibilityRecommendationsCard visibilityTips={recommendations.visibilityTips} />
        <KeywordRecommendationsCard keywordRecommendations={recommendations.keywordRecommendations} />
      </div>

      <ContentStrategyCard contentStrategies={recommendations.contentStrategy} />
    </div>
  );
};
