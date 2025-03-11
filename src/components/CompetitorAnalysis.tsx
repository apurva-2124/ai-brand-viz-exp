
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandData } from "@/components/BrandTracker";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { generateMockCompetitorData } from "@/lib/mockData";

interface CompetitorAnalysisProps {
  brandData: BrandData;
}

export const CompetitorAnalysis = ({ brandData }: CompetitorAnalysisProps) => {
  const [loading, setLoading] = useState(true);
  const [competitorData, setCompetitorData] = useState<any>(null);

  useEffect(() => {
    // Simulate API request
    const fetchData = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      const data = generateMockCompetitorData(brandData);
      
      // Simulate loading
      setTimeout(() => {
        setCompetitorData(data);
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, [brandData]);

  if (loading) {
    return <CompetitorSkeleton />;
  }

  return (
    <div className="space-y-6">
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
