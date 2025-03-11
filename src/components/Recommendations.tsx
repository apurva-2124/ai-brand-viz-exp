
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrandData } from "@/components/BrandTracker";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateMockRecommendations } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface RecommendationsProps {
  brandData: BrandData;
}

export const Recommendations = ({ brandData }: RecommendationsProps) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API request
    const fetchData = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      const data = generateMockRecommendations(brandData);
      
      // Simulate loading
      setTimeout(() => {
        setRecommendations(data);
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, [brandData]);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Actionable Recommendations</h2>
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Visibility Optimization</CardTitle>
            <CardDescription>
              Ways to improve your brand's presence in AI search results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recommendations.visibilityTips.map((tip: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <p>{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Recommendations</CardTitle>
            <CardDescription>
              Focus on these keywords to improve AI visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.keywordRecommendations.map((item: any) => (
                <div key={item.keyword} className="border-l-4 border-primary pl-4 py-1">
                  <p className="font-medium">{item.keyword}</p>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Strategy</CardTitle>
          <CardDescription>
            Strategic content changes to maximize AI visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendations.contentStrategy.map((strategy: any, index: number) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h4 className="font-semibold mb-2">{strategy.title}</h4>
                <p className="text-muted-foreground mb-3">{strategy.description}</p>
                <div className="bg-secondary/50 p-3 rounded-md">
                  <p className="text-sm font-medium">Example:</p>
                  <p className="text-sm italic">{strategy.example}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RecommendationsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <Skeleton className="h-7 w-[250px]" />
      <Skeleton className="h-10 w-[150px]" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-[220px] mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[180px] mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="border-b pb-4">
              <Skeleton className="h-5 w-[200px] mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
