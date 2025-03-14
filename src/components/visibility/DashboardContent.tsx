
import { BrandData } from "@/components/BrandTracker";
import { AIvsTraditionalComparison } from "@/components/AIvsTraditionalComparison";
import { ScoreCards } from "@/components/visibility/ScoreCards";
import { SearchQueriesCard } from "@/components/visibility/SearchQueriesCard";
import { VisibilityBreakdownCards } from "@/components/visibility/VisibilityBreakdownCards";
import { KeywordPerformanceChart } from "@/components/visibility/KeywordPerformanceChart";
import { AIResponseAnalysis } from "@/components/visibility/AIResponseAnalysis";

interface DashboardContentProps {
  brandData: BrandData;
  visibilityData: any;
  useMockData: boolean;
  loading: boolean;
  error: string | null;
}

export const DashboardContent = ({ 
  brandData, 
  visibilityData, 
  useMockData,
  loading,
  error
}: DashboardContentProps) => {
  if (!visibilityData || loading || error) {
    return null;
  }

  const overallScore = visibilityData.overallScore;

  return (
    <>
      <ScoreCards 
        overallScore={overallScore} 
        brandData={brandData} 
      />

      {visibilityData?.queries && (
        <SearchQueriesCard queries={visibilityData.queries} />
      )}

      <AIvsTraditionalComparison 
        brandData={brandData} 
        aiResults={visibilityData} 
      />

      <VisibilityBreakdownCards
        overallScore={overallScore}
        prominentMentions={visibilityData.prominentMentions}
        vagueMentions={visibilityData.vagueMentions}
        notFound={visibilityData.notFound}
        competitorsDetected={visibilityData.competitorsDetected}
      />

      <KeywordPerformanceChart 
        keywordStrength={visibilityData.keywordStrength} 
      />

      {!useMockData && visibilityData.results && visibilityData.results.length > 0 && (
        <AIResponseAnalysis results={visibilityData.results} />
      )}
    </>
  );
};
