
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandData } from "@/components/BrandTracker";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { generateMockData } from "@/lib/mockData";

interface VisibilityDashboardProps {
  brandData: BrandData;
}

export const VisibilityDashboard = ({ brandData }: VisibilityDashboardProps) => {
  const [loading, setLoading] = useState(true);
  const [visibilityData, setVisibilityData] = useState<any>(null);

  useEffect(() => {
    // Simulate API request
    const fetchData = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      const data = generateMockData(brandData);
      
      // Simulate loading
      setTimeout(() => {
        setVisibilityData(data);
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, [brandData]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  // The overall visibility score (0-100)
  const overallScore = visibilityData.overallScore;
  
  // Color based on score
  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall AI Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full w-24 h-24 bg-secondary text-3xl font-bold">
                {overallScore}
              </div>
              <p className="mt-2 text-muted-foreground">out of 100</p>
            </div>
            <Progress 
              value={overallScore} 
              className={`h-2 mt-4 ${getScoreColor(overallScore)}`} 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visibility Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Prominent Mentions:</span>
                <span className="font-medium">{visibilityData.prominentMentions}</span>
              </li>
              <li className="flex justify-between">
                <span>Vague Mentions:</span>
                <span className="font-medium">{visibilityData.vagueMentions}</span>
              </li>
              <li className="flex justify-between">
                <span>Not Found:</span>
                <span className="font-medium">{visibilityData.notFound}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">
              Top performing keywords for your brand
            </p>
            <ul className="space-y-2">
              {visibilityData.keywordStrength.slice(0, 3).map((item: any) => (
                <li key={item.keyword} className="flex justify-between">
                  <span>{item.keyword}</span>
                  <span className="font-medium">{item.score}/10</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visibilityData.keywordStrength}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="keyword" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="score" name="Visibility Score">
                  {visibilityData.keywordStrength.map((entry: any, index: number) => {
                    const color = entry.score >= 7 
                      ? "#22c55e" // green
                      : entry.score >= 4 
                        ? "#eab308" // yellow
                        : "#ef4444"; // red
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-[180px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-20 w-20 rounded-full mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[200px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[320px] w-full" />
      </CardContent>
    </Card>
  </div>
);
